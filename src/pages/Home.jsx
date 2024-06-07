import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div>
			<h1>Home</h1>
			<div>
				<Link to="/game/new">Create a game</Link>
				<Link to="/game/join">Join a game</Link>
			</div>
		</div >
	);
}