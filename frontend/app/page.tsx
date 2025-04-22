"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [avatar, setAvatar] = useState("");
	const [username, setUsername] = useState("");
	const [letterboxdLink, setLetterboxdLink] = useState("");
	const [code, setCode] = useState("");

	const [joinError, setJoinError] = useState("");
	const [letterboxdError, setLetterboxdError] = useState("");

	const checkRoomExists = async (roomCode: string) => {
		await new Promise((res) => setTimeout(res, 500));
		return roomCode === "ABCDE";
	};

	const checkLetterboxdAccount = async (link: string) => {
		setLetterboxdError("");
		await new Promise((res) => setTimeout(res, 500));

		if (!link.includes("letterboxd.com/")) {
			setLetterboxdError("Invalid Letterboxd link.");
		} else if (link != "letterboxd.com/calel44") {
			setLetterboxdError("Letterboxd account not found");
		}
	};

	const handleJoin = async () => {
		setJoinError("");
		const exists = await checkRoomExists(code);

		if (exists) {
			console.log("JOIN GAME");
			// router.push(`/room/${code}`);
		} else {
			setJoinError("This room does not exist.");
		}
	};

	const handleCreate = () => {
		console.log("CREATE GAME");
		console.log("Username:", username);
		console.log("Letterboxd:", letterboxdLink);
		console.log("Avatar:", avatar);
	};

	return (
		<div className="font-[family-name:var(--font-jersey-25)] h-full">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				className="flex flex-col gap-4 items-center h-full justify-center"
			>
				<div className="flex flex-row gap-4">
					<label className="cursor-pointer">
						<div className="w-24 h-24 bg-black/10 rounded-md overflow-hidden">
							{avatar ? (
								<Image
									src={URL.createObjectURL(avatar)}
									width={24}
									height={24}
									alt="Avatar preview"
									unoptimized
									className="w-full h-full object-cover"
								/>
							) : (
								<Image
									src="/Avatar_Placeholder.png"
									width={24}
									height={24}
									alt="Placeholder"
									unoptimized
									className="w-full h-full object-contain opacity-40 bg-black"
								/>
							)}
						</div>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => setAvatar(e.target.files?.[0] || null)}
							className="hidden"
						/>
					</label>
					<div className="flex flex-col gap-4">
						<input
							type="text"
							maxLength={18}
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-52 p-2 rounded-md focus:outline-none bg-black/10"
						/>
						<div className="flex gap-2 relative items-center">
							<input
								type="text"
								placeholder="Letterboxd account link"
								value={letterboxdLink}
								onChange={(e) => setLetterboxdLink(e.target.value)}
								className="w-37 p-2 rounded-md focus:outline-none bg-black/10"
							/>
							<button
								type="button"
								onClick={() => checkLetterboxdAccount(letterboxdLink)}
								className="p-2 bg-black/10 rounded cursor-pointer"
							>
								Check
							</button>
							{letterboxdError && (
								<span className="absolute -bottom-4 left-2 text-red-500 text-sm">
									{letterboxdError}
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
						className="w-38 p-2 rounded-md focus:outline-none bg-black/10"
					/>
					<button
						onClick={handleJoin}
						disabled={!(code.length == 5)}
						className={`w-38 p-2 rounded-md  bg-black/10 transition-opacity ${
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
					onClick={handleCreate}
					className="w-80 p-2 rounded-md cursor-pointer bg-black/10"
				>
					Create game
				</button>
			</form>
		</div>
	);
}
