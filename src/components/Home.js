import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function Home() {
	return (
		<div>
			<h1 className="font-bold">Home</h1>
			<div className="flex flex-col">
				<Link to="/game/new">Create a game</Link>
				<Link to="/game/join">Join a game</Link>
			</div>
		</div>
	);
}
