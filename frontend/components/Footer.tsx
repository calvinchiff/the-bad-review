import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="h-50 w-full font-jersey-25 flex items-center justify-center gap-4 text-white/60">
			<p className="text-base">
				© {new Date().getFullYear()}{" "}
				<a
					href="https://calvinchiff.com"
					target="_blank"
					rel="noopener noreferrer"
					className="underline hover:text-white transition"
				>
					CalvinChiff
				</a>
				. All rights reserved.
			</p>

			<a
				href="https://github.com/calvinchiff"
				target="_blank"
				rel="noopener noreferrer"
				className="text-xl hover:text-white transition"
			>
				<FaGithub />
			</a>
		</footer>
	);
}
