"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const [user, setUser] = useState({
		username: "",
		letterboxdLink: "",
		avatar: "",
		reviews: [] as string[],
	});
	const [code, setCode] = useState("");

	const [joinError, setJoinError] = useState("");
	const [letterboxdResponse, setLetterboxdResponse] = useState("");

	useEffect(() => {
		const profile = localStorage.getItem("userProfile");
		console.log("profile: " + profile);
		if (profile) setUser(JSON.parse(profile));
	}, []);

	const checkLetterboxdAccount = async (link: string) => {
		setLetterboxdResponse("");
		await new Promise((res) => setTimeout(res, 500));

		if (!link.includes("letterboxd.com/")) {
			setLetterboxdResponse("Invalid Letterboxd link.");
		} else if (link != "letterboxd.com/calel44") {
			setLetterboxdResponse("Letterboxd account not found");
		} else {
			setLetterboxdResponse("Account loaded ! 15 reviews found !");
			setUser((prev) => ({...prev, reviews: ["review", "reviews2"]));
		}
	};

	const updateLocalStorage = (
		newData: Partial<{
			username: string;
			letterboxdLink: string;
			avatar: string;
			reviews: string[];
		}>
	) => {
		const existing = localStorage.getItem("userProfile");
		const profile = existing ? JSON.parse(existing) : {};
		const updatedProfile = { ...profile, ...newData };
		localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
	};

	const handleAvatarChange = async (file: File) => {
		const base64 = await fileToBase64(file);
		setUser((prev) => ({ ...prev, avatar: base64 }));
		updateLocalStorage({ avatar: base64 });
	};

	const checkRoomExists = async (roomCode: string) => {
		await new Promise((res) => setTimeout(res, 500));
		return roomCode === "ABCDE";
	};

	const handleJoin = async () => {
		setJoinError("");
		const exists = await checkRoomExists(code);

		if (exists) {
			router.push(`/${code}`);
		} else {
			setJoinError("This room does not exist.");
		}
	};

	const createRoom = async () => {
		await new Promise((res) => setTimeout(res, 500));
		const roomCode = "ABCDE";
		return roomCode;
	};

	const handleCreate = async () => {
		const roomCode = await createRoom();
		router.push(`/${roomCode}`);
	};

	function fileToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

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
						<div className="w-24 h-24 bg-black/10 rounded-md overflow-hidden">
							{user.avatar ? (
								<Image
									src={user.avatar}
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
							onChange={(e) => {
								const value = e.target.value;
								setUser((prev) => ({ ...prev, username: value }));
								updateLocalStorage({ username: value });
							}}
							className="w-52 p-2 rounded-md focus:outline-none bg-black/10"
						/>
						<div className="flex gap-2 relative items-center">
							<input
								type="text"
								placeholder="Letterboxd account link"
								value={user.letterboxdLink}
								onChange={(e) => {
									const value = e.target.value.toLowerCase();
									setUser((prev) => ({ ...prev, letterboxdLink: value }));
									updateLocalStorage({ letterboxdLink: value });
								}}
								className="w-37 p-2 rounded-md focus:outline-none bg-black/10"
							/>
							<button
								type="button"
								onClick={() => checkLetterboxdAccount(user.letterboxdLink)}
								className="p-2 bg-black/10 rounded cursor-pointer"
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
					disabled={user.username == ""}
					onClick={handleCreate}
					className={`w-80 p-2 rounded-md bg-black/10 ${
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
