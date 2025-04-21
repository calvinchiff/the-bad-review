import React from "react";
import Image from "next/image";

export default function Header() {
	return (
		<header className="w-full h-30 flex items-center justify-center">
			<Image
				src="/TBR_Logo.png"
				alt="TBR Logo"
				width={120}
				height={120}
				unoptimized
			/>
		</header>
	);
}
