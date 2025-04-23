import React from "react";

export default function Footer() {
	return (
		<footer className="h-50 flex w-full font-jersey-25 items-center justify-center text-white/60">
			<p className="text-base">
				© {new Date().getFullYear()} CalvinChiff. All rights reserved.
			</p>
		</footer>
	);
}
