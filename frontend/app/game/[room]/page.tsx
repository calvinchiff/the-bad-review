"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AvatarHolder from "@/components/AvatarHolder";
import { Player, Room } from "@shared/types";
import { useSocket } from "@/hooks/useSocket";
// import { getMockedPlayers } from "@/mock/users";
// import { mockedQuestions, Question } from "@/mock/questions";

export default function Room() {
	const { room } = useParams();
	const { socket } = useSocket();

	// Data retrieved from back
	const [roomData, setRoomData] = useState<Room | null>(null);
	const [isAdmin, setIsAdmin] = useState(true);
	// const [phase, setPhase] = useState<"lobby" | "game" | "ranking">("lobby");
	// const [players, setPlayers] = useState<Player[]>([]);
	// const [currentRound, setCurrentRound] = useState(1);
	// const [timer, setTimer] = useState(20);
	// const [question, setQuestion] = useState<Question>(mockedQuestions[0]);

	// UI handling
	const [copied, setCopied] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const [freeAnswer, setFreeAnswer] = useState("");
	const [visibleCount, setVisibleCount] = useState(0);
	const [currentUser, setCurrentUser] = useState<Player | null>(null);

	const totalSlots = 12;

	const { leaveRoom } = useSocket();

	// Ensuite on envoie le get_room_data une fois que tout est prêt
	useEffect(() => {
		if (!socket || !room) return;
		console.log("get_room_data triggered with:", room);
		socket.emit("get_room_data", room, setRoomData);
	}, [socket, room]);

	// Listen to room updates
	useEffect(() => {
		socket.on("room_updated", setRoomData);

		return () => {
			socket.off("room_updated", setRoomData);
		};
	}, [socket]);

	// Get user profile
	useEffect(() => {
		const profile = localStorage.getItem("userProfile");
		if (profile) {
			try {
				const parsed = JSON.parse(profile);
				setCurrentUser(parsed);
			} catch (err) {
				console.error("Failed to parse userProfile", err);
			}
		}
	}, []);

	// Final ranking animation one by one
	useEffect(() => {
		if (!roomData || roomData.phase !== "ranking") return;
		setVisibleCount(0);
		const interval = setInterval(() => {
			setVisibleCount((prev) => {
				if (prev >= roomData.players.length) {
					clearInterval(interval);
					return prev;
				}
				return prev + 1;
			});
		}, 3000);

		return () => clearInterval(interval);
	}, [roomData]);

	const handleCopy = async () => {
		if (typeof room !== "string") return;

		try {
			if (navigator?.clipboard?.writeText) {
				await navigator.clipboard.writeText(room);
			} else {
				const textArea = document.createElement("textarea");
				textArea.value = room;
				textArea.setAttribute("readonly", "");
				textArea.style.position = "fixed";
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
			}

			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch (err) {
			console.error("Failed to copy", err);
		}
	};

	const handleNextRound = async () => {
		// if (currentRound === 10) return setPhase("ranking");
		// setCurrentRound((r) => r + 1);
		// setQuestion(mockedQuestions[currentRound]);
		// setTimer(20);
		try {
			setShowOptions(false);
			setFreeAnswer("");
		} catch (err) {
			console.error("Failed to go to next round", err);
		}
	};

	const handleStartGame = async () => {
		// setPhase("game");
		// setCurrentRound(1);
		// setQuestion(mockedQuestions[0]);
		// setTimer(20);
		try {
		} catch (err) {
			console.error("Failed to start game", err);
		}
	};

	const handleReturnToLobby = async () => {
		try {
		} catch (err) {
			console.error("Failed to return to lobby", err);
		}
	};

	const removePlayer = (player_id: string) => {
		// setPlayers((prev) => prev.filter((_, i) => i !== player_id));
		socket.emit("remove_player", player_id);
	};

	const handleLeaveRoom = () => {
		if (typeof room == "string") leaveRoom({ roomCode: room });
	};

	return (
		<>
			<div>{room}</div>
			{roomData && roomData.phase === "lobby" && (
				<div className="max-h-full w-full flex flex-col items-center md:gap-2 overflow-hidden">
					<p className="">
						{roomData?.players.length} / {totalSlots} players
					</p>
					<div className="flex flex-row align-center justify-center gap-2">
						<p className="p-2">Room code : {room}</p>
						<button
							onClick={handleCopy}
							className="p-2 bg-black/10 rounded-md hover:bg-black/20 transition cursor-pointer"
						>
							{copied ? "Copied!" : "Copy"}
						</button>
					</div>
					<div className="grid grid-cols-4 md:grid-cols-6 grid-rows-3 md:grid-rows-2 gap-4 py-2 md:p-2">
						{Array.from({ length: totalSlots }).map((_, i) => (
							<div key={i} className="relative">
								<AvatarHolder avatar={roomData?.players[i]?.avatar || ""} />
								<p className="h-2 md:h-6 text-center">
									{roomData?.players[i]?.username || ""}
								</p>
								{isAdmin &&
									roomData?.players[i] &&
									currentUser?.username !== roomData?.players[i].username && (
										<button
											onClick={() => removePlayer(i)}
											className="select-none absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 text-lg text-gray-400 cursor-pointer flex items-center justify-center shadow-md"
											aria-label="Remove player"
										>
											×
										</button>
									)}
							</div>
						))}
					</div>
					<div className="flex flex-row gap-2">
						<button
							onClick={handleLeaveRoom}
							className="p-4 bg-black/20 rounded-md hover:bg-black/30 transition cursor-pointer"
						>
							Leave
						</button>
						<button
							onClick={handleStartGame}
							className="p-4 bg-black/10 rounded-md hover:bg-black/20 transition cursor-pointer"
						>
							Play
						</button>
					</div>
				</div>
			)}
			{roomData && roomData.phase === "game" && (
				<>
					<p className="text-2xl">
						Round {roomData?.currentQuestionIndex} / 10
					</p>
					<p className="text-lg">Time left: {roomData?.currentTimer}s</p>
					<p className="text-xl mt-4">
						{roomData?.questions[roomData?.currentQuestionIndex].text}
					</p>
					<p className="text-xl mt-4">
						{roomData?.questions[roomData?.currentQuestionIndex].review}
					</p>
					{!showOptions ? (
						<div className="flex flex-col items-center mt-4 gap-4">
							<input
								className="p-2 rounded bg-white/5 w-full max-w-md text-center focus:outline-none"
								placeholder="Your answer"
								value={freeAnswer}
								onChange={(e) => setFreeAnswer(e.target.value)}
							/>
							{roomData &&
								roomData.questions[roomData.currentQuestionIndex].options
									.length > 0 && (
									<button
										onClick={() => setShowOptions(true)}
										className="text-sm text-gray-300 underline hover:text-white cursor-pointer transition"
									>
										Show square (half points)
									</button>
								)}
						</div>
					) : (
						<div className="grid grid-cols-2 gap-4 mt-4">
							{roomData.questions[roomData.currentQuestionIndex].options.map(
								(opt, idx) => (
									<button
										key={idx}
										onClick={() => setFreeAnswer(opt)}
										className={`p-4 rounded transition cursor-pointer
			${
				freeAnswer === opt
					? "bg-white/20 border text-white font-bold"
					: "bg-black/10 hover:bg-black/20"
			}
		`}
									>
										{opt}
									</button>
								)
							)}
						</div>
					)}
					{isAdmin && (
						<button
							className="mt-8 bg-black/10 p-4 rounded hover:bg-black/20 transition cursor-pointer"
							onClick={handleNextRound}
						>
							Next round
						</button>
					)}
				</>
			)}

			{roomData && roomData.phase === "ranking" && (
				<>
					<h2 className="text-3xl text-center mb-4">🏆 Final Ranking</h2>

					<ul className="mt-4 text-center">
						{[...roomData.players]
							.sort((a, b) => b.position - a.position)
							.slice(0, visibleCount)
							.reverse()
							.map((p, i) => (
								<li key={p.username} className="p-2 text-xl animate-fade-in">
									{p.position}. {p.username}
								</li>
							))}
					</ul>

					{isAdmin && visibleCount >= roomData.players.length && (
						<button
							className="mt-8 p-4 bg-black/10 rounded-md hover:bg-black/20 transition cursor-pointer"
							onClick={handleReturnToLobby}
						>
							Back to lobby
						</button>
					)}
				</>
			)}
		</>
	);
}
