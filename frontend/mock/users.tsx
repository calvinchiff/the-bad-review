type Player = {
	username: string;
	avatar: string;
	position: number;
};

const mocked: Player[] = [
	{ username: "Alice", avatar: "", position: 3 },
	{ username: "Bob", avatar: "", position: 2 }
];

export function getMockedPlayers(): Player[] {
	const storedUser = localStorage.getItem("userProfile");

	console.log("user: " + storedUser);
	if (!storedUser) return mocked;

	const parsed = JSON.parse(storedUser);
	const currentUser: Player = {
		username: parsed.username || "You",
		avatar: parsed.avatar || "/Avatar_Placeholder.png",
		position: 1
	};

	return [currentUser, ...mocked];
}
