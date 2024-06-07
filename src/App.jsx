// import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="bg">
				<header>
					<Link to="/" className="text-3xl font-bold text-blue-600">
						TheBadReviews
					</Link>
				</header>
				<div className="flex flex-col items-center justify-center min-h-screen">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/game/new" element={<CreateGame />} />
						<Route path="/game/join" element={<JoinGame />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

function NotFound() {
	return (
		<div>
			<h1>404 - Not Found</h1>
		</div>
	)
}

export default App;
