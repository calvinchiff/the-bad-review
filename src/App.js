// import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="bg-red-300 min-h-screen">
				<header>
					<Link to="/" className="text-3xl font-bold text-blue-600">
						The Bad Reviews
					</Link>
				</header>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/game/new" element={<CreateGame />} />
					<Route path="/game/join" element={<JoinGame />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
