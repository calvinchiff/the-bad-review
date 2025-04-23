import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="fixed bottom-5 md:bottom-10 w-full font-jersey-25 text-white/60">
			<div className="flex w-full justify-center items-center gap-4 px-4 text-center">
				<p className="text-base whitespace-nowrap">
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
			</div>
		</footer>
	);
}
