"use client";

import { useSocket } from "@/hooks/useSocket";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import AvatarHolder from "@/components/AvatarHolder";
import { Player } from "@shared/types";

export default function Home() {
	// const router = useRouter();
	const { connectAndJoin } = useSocket();

	const [user, setUser] = useState<Player>({
		id: "",
		username: "",
		letterboxd: "",
		avatar: "",
		reviews: [],
		score: 0
	});
	const [code, setCode] = useState("");
	const [joinError, setJoinError] = useState("");
	const [letterboxdResponse, setLetterboxdResponse] = useState("");

	useEffect(() => {
		const profile = localStorage.getItem("userProfile");
		if (profile) setUser(JSON.parse(profile));
	}, []);

	const updateUser = (newData: Partial<Player>) => {
		setUser((prev) => {
			const updated = { ...prev, ...newData };
			localStorage.setItem("userProfile", JSON.stringify(updated));
			return updated;
		});
	};

	const checkLetterboxdAccount = async (link: string) => {
		setLetterboxdResponse("");
		await new Promise((res) => setTimeout(res, 500));

		if (!link.includes("letterboxd.com/")) {
			setLetterboxdResponse("Invalid Letterboxd link.");
		} else if (link != "letterboxd.com/calel44") {
			setLetterboxdResponse("Letterboxd account not found");
		} else {
			setLetterboxdResponse("Account loaded ! 15 reviews found !");
			updateUser({ reviews: ["review", "reviews2"] });
		}
	};

	const handleAvatarChange = async (file: File) => {
		const base64 = await fileToBase64(file);
		updateUser({ avatar: base64 });
	};

	function fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	// Create/Join Rooms logic

	function handleCreate() {
		connectAndJoin({
			player: { ...user },
			onError: (msg) => setJoinError(msg)
		});
	}

	function handleJoin() {
		connectAndJoin({
			player: { ...user },
			roomCode: code,
			onError: (msg) => setJoinError(msg)
		});
	}

	// const checkRoomExists = async (roomCode: string) => {
	// 	await new Promise((res) => setTimeout(res, 500));
	// 	return roomCode === "ABCDE";
	// };

	// const handleJoin = async () => {
	// 	setJoinError("");
	// 	const exists = await checkRoomExists(code);

	// 	if (exists) {
	// 		router.push(`/${code}`);
	// 	} else {
	// 		setJoinError("This room does not exist.");
	// 	}
	// };

	// const createRoom = async () => {
	// 	await new Promise((res) => setTimeout(res, 500));
	// 	const roomCode = "ABCDE";
	// 	return roomCode;
	// };

	// const handleCreate = async () => {
	// 	const roomCode = await createRoom();
	// 	router.push(`/game/${roomCode}`);
	// };

	return (
		<div className="h-full font-[family-name:var(--font-jersey-25)]">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className="flex flex-col gap-4 items-center h-full justify-center"
			>
				<div className="flex flex-row gap-4">
					<label className="cursor-pointer">
						<AvatarHolder avatar={user.avatar} />
						<input
							type="file"
							accept="image/*"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (file) handleAvatarChange(file);
							}}
							className="hidden"
						/>
					</label>
					<div className="flex flex-col gap-4">
						<input
							type="text"
							maxLength={18}
							placeholder="Username"
							value={user.username}
							onChange={(e) => updateUser({ username: e.target.value })}
							className="w-52 md:w-79 p-1 md:p-2 rounded-md focus:outline-none bg-black/10 text-center"
						/>
						<div className="flex gap-2 relative items-center">
							<input
								type="text"
								placeholder="Letterboxd account link"
								value={user.letterboxd}
								onChange={(e) =>
									updateUser({ letterboxd: e.target.value.toLowerCase() })
								}
								className="w-39 md:w-59 p-1 md:p-2 rounded-md focus:outline-none bg-black/10"
							/>
							<button
								type="button"
								onClick={() => checkLetterboxdAccount(user.letterboxd)}
								className="p-1 md:p-2 bg-black/10 rounded-md cursor-pointer"
							>
								Check
							</button>
							{letterboxdResponse && (
								<span className="absolute -bottom-4 left-2 text-red-500 text-sm">
									{letterboxdResponse}
								</span>
							)}
						</div>
					</div>
				</div>
				<div className="relative flex flex-row gap-4">
					<input
						type="text"
						maxLength={5}
						placeholder="Code to join room"
						value={code}
						onChange={(e) => setCode(e.target.value.toUpperCase())}
						className="w-38 md:w-46 p-2 text-center rounded-md focus:outline-none bg-black/10"
					/>
					<button
						onClick={handleJoin}
						disabled={!(code.length == 5)}
						className={`w-38 md:w-46 p-2 rounded-md  bg-black/10 transition-opacity ${
							!(code.length == 5)
								? "opacity-50 cursor-not-allowed"
								: "opacity-100 cursor-pointer"
						}`}
					>
						Join game
					</button>
					{joinError && (
						<span className="absolute -bottom-4 left-2 text-red-500 text-sm">
							{joinError}
						</span>
					)}
				</div>
				<button
					disabled={user.username == ""}
					onClick={handleCreate}
					className={`w-80 md:w-96 p-2 rounded-md bg-black/10 ${
						user.username == ""
							? "opacity-50 cursor-not-allowed"
							: "opacity-100 cursor-pointer"
					}`}
				>
					Create game
				</button>
			</form>
		</div>
	);
}
