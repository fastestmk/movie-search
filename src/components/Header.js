import React from "react";

// Props are use to send data from parent to child component
const Header = (props) =>  {
	return (
		<header className = "App-header">
			<h2>{props.text}</h2>
		</header>
	);
}

export default Header;