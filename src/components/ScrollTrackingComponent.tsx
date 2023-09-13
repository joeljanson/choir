import React, { useEffect, useRef, useState } from "react";
import { Player, Volume, gainToDb } from "tone";
import { ljudbild4 } from "../utils/AudioFiles";

import "../css/ScrollTracking.scss";

const ScrollTrackingDiv: React.FC = () => {
	const divRef = useRef<HTMLDivElement>(null);
	const myVol = useRef<Volume | null>(null);
	const player = useRef<Player | null>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const [scrollVelocity, setScrollVelocity] = useState<number>(0);

	// Function to handle scroll events
	const handleScroll = () => {
		if (divRef.current) {
			// Just update the current scroll position
			const newScrollPosition = divRef.current.scrollTop;
			setScrollPosition(newScrollPosition);

			if (newScrollPosition > 10000) {
				console.log("Scroll bigger than 10000!");
			}
		}
	};

	useEffect(() => {
		const currentDivNode = divRef.current;

		if (currentDivNode) {
			// Add scroll event listener when the component mounts
			currentDivNode.addEventListener("scroll", handleScroll);
			const volume = new Volume(-Infinity).toDestination();
			myVol.current = volume;
			console.log(ljudbild4);
			const intPlayer = new Player(ljudbild4, () => {
				console.log("Ljudbild Audio loaded");
				intPlayer.start();
				intPlayer.loop = true;
			}).connect(volume);
			player.current = intPlayer;

			// Clean up the listener when the component unmounts
			return () => {
				currentDivNode.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);

	useEffect(() => {
		// Use requestAnimationFrame to continually track velocity even when not scrolling
		let animationFrameId: number;
		const lerpFactor = 0.05; // You can adjust this to change the speed of interpolation
		let lastFrameVelocity = 0; // To store the velocity of the last frame
		let lastFramePosition = 0; // To store the velocity of the last frame

		const mapValue = (
			input: number,
			inputStart: number,
			inputEnd: number,
			outputStart: number,
			outputEnd: number
		) => {
			const inputRange = inputEnd - inputStart;
			const outputRange = outputEnd - outputStart;

			return ((input - inputStart) * outputRange) / inputRange + outputStart;
		};

		const trackVelocity = () => {
			// Calculate the change in scroll position since the last frame
			const scrollChange = scrollPosition - lastFramePosition;

			// Calculate the scroll velocity as a value between 0 and 1
			// You can adjust the factor (e.g., 0.01) to control the sensitivity
			let velocity = Math.abs(scrollChange) * 0.01;
			//console.log("Scrollposition is: ", scrollPosition);
			// Lerp the velocity value
			velocity = (1 - lerpFactor) * lastFrameVelocity + lerpFactor * velocity;

			lastFrameVelocity = velocity;
			lastFramePosition = scrollPosition;
			const mappedVelocity = mapValue(velocity, 0, 10, 0, 1);
			//console.log(mappedVelocity);

			if (velocity > 0) {
				//console.log(gainToDb(velocity));
				const vol = mappedVelocity > 1 ? 1 : mappedVelocity;
				//let playbackRate = mappedVelocity > 1 ? 1 : mappedVelocity;
				//playbackRate = playbackRate < 0.5 ? 0.5 : playbackRate;
				myVol.current?.volume.rampTo(gainToDb(vol), 1);
				if (player.current) {
					/*player.current._activeSources.forEach((source: any) => {
						source.playbackRate.rampTo(playbackRate, 10);
					});*/
				}
			}
			// Update the state with the current velocity
			setScrollVelocity(velocity);

			// Request the next animation frame
			animationFrameId = requestAnimationFrame(trackVelocity);
		};

		// Start tracking velocity when the component mounts
		trackVelocity();

		// Clean up the animation frame when the component unmounts
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [scrollPosition]);

	return (
		<div className="infinite-scrollbar">
			{/* Content with a large scrollable height */}
			<div className="scroll-content" ref={divRef}>
				Scroll Position: {scrollPosition}px
				<br />
				Scroll Velocity: {scrollVelocity.toFixed(2)}
				<div style={{ height: "10000px", backgroundColor: "coral" }}>HEJ</div>
				<div style={{ height: "10000px", backgroundColor: "blue" }}>HEJ</div>
			</div>
		</div>
	);
};

export default ScrollTrackingDiv;
