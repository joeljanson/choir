//Import external libraries
import React, { useState, useEffect } from "react";

//Load CSS
import "./App.scss";

import Decay from "./components/Decay/Decay";

const isMobileDevice = () => {
	return window.innerWidth <= 768; // You can adjust this threshold as needed
};

function App() {
	const [isPortrait, setIsPortrait] = useState<boolean>(true);

	useEffect(() => {
		const handleOrientationChange = () => {
			setIsPortrait(window.innerWidth < window.innerHeight);
		};

		console.log(window.innerWidth < window.innerHeight);

		// Initial check
		handleOrientationChange();

		window.addEventListener("resize", handleOrientationChange);

		return () => {
			window.removeEventListener("resize", handleOrientationChange);
		};
	}, []);

	return (
		<div className="app-container">
			<Decay />
			{isPortrait === false && (
				<div className="overlay">
					<div className="overlay-message">
						This website requires portrait orientation on mobile devices.
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
