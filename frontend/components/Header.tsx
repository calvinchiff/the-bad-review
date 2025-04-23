import React from "react";
import Image from "next/image";

export default function Header() {
	return (
		<header className="fixed md:top-10 w-full flex items-center justify-center">
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
