"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AvatarHolder from "@/components/AvatarHolder";
import { getMockedPlayers, Player } from "@/mock/users";

export default function Room() {
	const { room } = useParams();
	const [copied, setCopied] = useState(false);
	const [players, setPlayers] = useState<Player[]>([]);

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
		<div className="max-h-full w-full flex flex-col items-center md:gap-2">
			<p className="p-2">
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
			<div className="grid grid-cols-4 md:grid-cols-6 grid-rows-3 md:grid-rows-2 gap-4 p-2">
				{Array.from({ length: totalSlots }).map((_, i) => (
					<div key={i} className="relative">
						<AvatarHolder avatar={players[i]?.avatar || ""} />
						<p className="h-6 text-center">{players[i]?.username || ""}</p>
						{players[i] && (
							<button
								onClick={() => removePlayer(i)}
								className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 text-lg text-gray-400 cursor-pointer flex items-center justify-center shadow-md"
								aria-label="Remove player"
							>
								×
							</button>
						)}
					</div>
				))}
			</div>
			<button className="p-2 bg-black/10 rounded-md hover:bg-black/20 transition cursor-pointer">
				Play
			</button>
		</div>
	);
}
