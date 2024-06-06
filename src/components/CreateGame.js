import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function CreateGame() {
	const [username, setUsername] = useState("")

	function handleCreateGame() {
		console.log('create game, username :', username)
	}

	const isDisabled = !username;

	return (
		<div >
			<h1 className="font-bold">CreateGame</h1>
			<div>
				<input
					className="px-4 py-2 mb-4 border rounded mr-4"
					required type="text"
					placeholder="Enter your username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button
					className={`px-4 py-2 font-bold rounded ${isDisabled
						? 'bg-gray-400 text-gray-700 cursor-not-allowed'
						: 'bg-blue-500 text-white hover:bg-blue-700'
						}`}
					onClick={handleCreateGame}
					disabled={!username}
				>
					Create Game
				</button>
			</div>
		</div>
	)

}
