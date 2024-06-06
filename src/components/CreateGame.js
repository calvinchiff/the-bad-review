import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function CreateGame() {
	const [username, setUsername] = useState("")

	function handleCreateGame(){
		console.log('create')
	}

	return (
		<div>
			<h1 className="font-bold">CreateGame</h1>
			<input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
			<button onClick={handleCreateGame}>Create Game</button>
		</div>
	)

}
