import React from "react";
import LinkButton from "../components/LinkButton";
import PlayerImage from "../components/PlayerImage";
import TextField from "../components/TextField";
import "./Home.css";

export default function Home() {
	const [user, setUser] = React.useState("");
	const [profileImage, setProfileImage] = React.useState("");
	const isDisabled = !user || !profileImage;

	const handleImageUpdate = (image) => {
		setProfileImage(image);
	};

	return (
		<div className="Home-body">
			<h1>Home</h1>
			<PlayerImage onImageUpdate={handleImageUpdate} />
			<TextField />
			<input type="text" onChange={(e) => setUser(e.target.value)} />
			<LinkButton to="/game/new" name="Create a game" isDisabled={isDisabled} />
			<LinkButton to="/game/join" name="Join a game" isDisabled={isDisabled} />
		</div>
	);
}
