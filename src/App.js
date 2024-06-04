import "./App.css";

function App() {
	return (
		<header className="bg-red-300 min-h-screen">
			<div className="flex flex-col">
				<a href="/" className="text-3xl font-bold text-blue-600">
					The Bad Reviews
				</a>
				<a href="/game/new">Create a game</a>
				<a href="/game/join">Join a game</a>
			</div>
		</header>
	);
}

export default App;
