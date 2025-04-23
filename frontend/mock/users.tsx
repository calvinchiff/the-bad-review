export type Player = {
	username: string;
	avatar: string;
};

const mocked: Player[] = [
	{ username: "Alice", avatar: "" },
	{ username: "Bob", avatar: "" }
];

export function getMockedPlayers(): Player[] {
	const storedUser = localStorage.getItem("myProfile");

	if (!storedUser) return mocked;

	const parsed = JSON.parse(storedUser);
	const currentUser: Player = {
		username: parsed.username || "You",
		avatar: parsed.avatar || "/Avatar_Placeholder.png"
	};

	return [currentUser, ...mocked];
}
