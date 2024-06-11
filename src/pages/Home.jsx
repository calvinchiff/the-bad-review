import React from "react";
import LinkButton from "../components/LinkButton";

export default function Home() {
	const [isDisabled, setIsDisabled] = React.useState(true);

	const handleChange = () => {
		setIsDisabled(!isDisabled);
	}

	return (
		<div>
			<h1>Home</h1>
			<div>
				<input type="checkbox" onChange={handleChange} />
				<LinkButton to="/game/new" name="Create a game" isDisabled={isDisabled} />
				<LinkButton to="/game/join" name="Join a game" isDisabled={isDisabled} />
			</div>
		</div >
	);
}