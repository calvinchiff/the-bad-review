"use client";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
	const router = useRouter();
	const pathname = usePathname();

	const handleLogoClick = () => {
		if (pathname === "/") return;

		const confirmed = window.confirm(
			"Are you sure you want to leave the game and return to the homepage?"
		);
		if (confirmed) {
			router.push("/");
		}
	};

	return (
		<header className="fixed md:top-10 w-full flex items-center justify-center">
			<div
			// onClick={handleLogoClick}
			// className="cursor-pointer hover:opacity-80 transition"
			>
				<Image
					src="/TBR_Logo.png"
					alt="TBR Logo"
					width={120}
					height={120}
					unoptimized
				/>
			</div>
		</header>
	);
}
