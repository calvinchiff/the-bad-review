import React from "react";
import Image from "next/image";

type AvatarProps = {
	avatar: string;
	placeholder?: string;
};

export default function AvatarHolder({
	avatar,
	placeholder = "/Avatar_Placeholder.png"
}: AvatarProps) {
	return (
		<div className="w-24 md:w-28 h-24 md:h-28 bg-black/10 rounded-md overflow-hidden">
			<Image
				src={avatar || placeholder}
				width={36}
				height={36}
				alt="Avatar preview"
				unoptimized
				className="w-full h-full object-cover"
			/>
		</div>
	);
}
