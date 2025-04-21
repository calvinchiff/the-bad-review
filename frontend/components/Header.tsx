import React from "react";
import Image from "next/image";

export default function Header() {
	return (
		<header className="w-full h-30 flex items-center justify-center">
			<Image
				src="/TBR_Logo.png"
				height="120"
				width="120"
				style={{ objectFit: "contain" }}
				alt="TBR Logo"
			/>
		</header>
	);
}
