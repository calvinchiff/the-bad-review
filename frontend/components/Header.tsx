import React from "react";
import Image from "next/image";

export default function Header() {
	return (
		<header className="fixed w-full top-0 h-[15vh]">
			<Image
				src="/TBR_Logo.png"
				sizes="100%"
				style={{ objectFit: "contain" }}
				fill
				alt="TBR Logo"
			/>
		</header>
	);
}
