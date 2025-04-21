import React from "react";

export default function Footer() {
	return (
		<footer className="h-10 w-full font-jersey-25 text-center text-white/60">
			<p>© {new Date().getFullYear()} CalvinChiff. All rights reserved.</p>
		</footer>
	);
}
