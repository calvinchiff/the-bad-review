"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AvatarHolder from "@/components/AvatarHolder";
import { getMockedPlayers, Player } from "@/mock/users";
import { mockedQuestions, Question } from "@/mock/questions";

export default function Room() {
	const { room } = useParams();
	const [phase, setPhase] = useState<"lobby" | "game" | "ranking">("lobby");
	const [copied, setCopied] = useState(false);
	const [players, setPlayers] = useState<Player[]>([]);
	const [isAdmin, setIsAdmin] = useState(true);
	const [currentRound, setCurrentRound] = useState(1);
	const [timer, setTimer] = useState(20);
	const [question, setQuestion] = useState<Question>(mockedQuestions[0]);

	const totalSlots = 12;

	useEffect(() => {
		setPlayers(getMockedPlayers());
	}, []);

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

	const removePlayer = (index: number) => {
		setPlayers((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<>
			{phase === "lobby" && (
				<div className="max-h-full w-full flex flex-col items-center md:gap-2 overflow-hidden">
					<p className="">
						{players.length} / {totalSlots} players
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
								<AvatarHolder avatar={players[i]?.avatar || ""} />
								<p className="h-2 md:h-6 text-center">
									{players[i]?.username || ""}
								</p>
								{isAdmin && players[i] && (
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
					<button
						onClick={() => {
							setPhase("game");
							setCurrentRound(1);
							setQuestion(mockedQuestions[0]);
							setTimer(20);
						}}
						className="p-4 bg-black/10 rounded-md hover:bg-black/20 transition cursor-pointer"
					>
						Play
					</button>
				</div>
			)}
			{phase === "game" && (
				<>
					<p className="text-2xl">Round {currentRound} / 10</p>
					<p className="text-lg">Time left: {timer}s</p>
					<p className="text-xl mt-4">{question.question}</p>
					{question.options ? (
						<div className="grid grid-cols-2 gap-4 mt-4">
							{question.options.map((opt, idx) => (
								<button
									key={idx}
									className="bg-black/10 p-4 rounded hover:bg-black/20 transition cursor-pointer"
								>
									{opt}
								</button>
							))}
						</div>
					) : (
						<input
							className="p-2 mt-4 rounded bg-white/5 text-white w-full max-w-md"
							placeholder="Your answer"
						/>
					)}
					{isAdmin && (
						<button
							className="mt-8 bg-black/10 p-4 rounded hover:bg-black/20 transition cursor-pointer"
							onClick={() => {
								if (currentRound === 10) return setPhase("ranking");
								setCurrentRound((r) => r + 1);
								setQuestion(mockedQuestions[currentRound]);
								setTimer(20);
							}}
						>
							Next round
						</button>
					)}
				</>
			)}

			{phase === "ranking" && (
				<>
					<h2 className="text-3xl">🏆 Final Ranking</h2>
					<ul className="mt-4">
						{players.map((p, i) => (
							<li key={p.username} className="p-2">
								{i + 1}. {p.username}
							</li>
						))}
					</ul>
					{isAdmin && (
						<button className="mt-8" onClick={() => setPhase("lobby")}>
							Back to lobby
						</button>
					)}
				</>
			)}
		</>
	);
}
