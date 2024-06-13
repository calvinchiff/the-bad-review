import React from "react";
import LinkButton from "../components/LinkButton";
import PlayerImage from "../components/PlayerImage";

export default function Home() {
	const [user, setUser] = React.useState("");
	const [profileImage, setProfileImage] = React.useState("");
	const isDisabled = !user || !profileImage;

	const handleImageUpdate = (image) => {
		setProfileImage(image);
	}

	return (
		<div>
			<h1>Home</h1>
			<div>
				<PlayerImage onImageUpdate={handleImageUpdate} />
				<input type="text" onChange={(e) => setUser(e.target.value)} />
				<LinkButton to="/game/new" name="Create a game" isDisabled={isDisabled} />
				<LinkButton to="/game/join" name="Join a game" isDisabled={isDisabled} />
			</div>
		</div >
	);
}