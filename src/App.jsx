// import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Link to="/">
						<img className="App-logo" src="logo_resized_nobg.png" alt="TBR Logo" />
					</Link>
				</header>
				<div className="App-body">
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
