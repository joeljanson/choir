import React, { useEffect, useRef, useState } from "react";
import { Player, Volume, gainToDb, start } from "tone";
import { ljudbild4 } from "../utils/AudioFiles";

const ScrollTrackingDiv: React.FC = () => {
	const divRef = useRef<HTMLDivElement>(null);
	const myVol = useRef<Volume | null>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const [scrollVelocity, setScrollVelocity] = useState<number>(0);
	const [lastScrollTop, setLastScrollTop] = useState<number>(0);

	// Function to handle scroll events
	const handleScroll = () => {
		if (divRef.current) {
			// Calculate the current scroll position
			const currentPosition = divRef.current.scrollTop;

			// Calculate the change in scroll position since the last scroll event
			const scrollChange = currentPosition - lastScrollTop;

			// Calculate the scroll velocity as a value between 0 and 1
			// You can adjust the factor (e.g., 0.01) to control the sensitivity
			const velocity = Math.abs(scrollChange) * 0.1;

			// Update the state with the current scroll position and velocity
			setScrollPosition(currentPosition);
			setScrollVelocity(velocity);

			// Store the current scroll position as the last known scroll position
			setLastScrollTop(currentPosition);
		}
	};

	useEffect(() => {
		if (divRef.current) {
			// Add scroll event listener when the component mounts
			divRef.current.addEventListener("scroll", handleScroll);
			const volume = new Volume(-6).toDestination();
			myVol.current = volume; //This is not working, it says that current is a read-only?
			console.log(ljudbild4);
			const player = new Player(ljudbild4, () => {
				console.log("Ljudbild Audio loaded");
				player.start();
				player.loop = true;
			}).connect(volume);

			// Clean up the listener when the component unmounts
			return () => {
				divRef.current!.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);

	useEffect(() => {
		// Use requestAnimationFrame to continually track velocity even when not scrolling
		let animationFrameId: number;

		const trackVelocity = () => {
			// Calculate the change in scroll position since the last frame
			const scrollChange = scrollPosition - lastScrollTop;

			// Calculate the scroll velocity as a value between 0 and 1
			// You can adjust the factor (e.g., 0.01) to control the sensitivity
			let velocity = Math.abs(scrollChange) * 0.01;

			if (velocity > 0) {
				if (velocity < 0.2) {
					velocity = 0;
				}
				console.log(gainToDb(velocity));
				myVol.current?.volume.rampTo(gainToDb(velocity), 1);
			}
			// Update the state with the current velocity
			setScrollVelocity(velocity);

			// Store the current scroll position as the last known scroll position
			setLastScrollTop(scrollPosition);

			// Request the next animation frame
			animationFrameId = requestAnimationFrame(trackVelocity);
		};

		// Start tracking velocity when the component mounts
		trackVelocity();

		// Clean up the animation frame when the component unmounts
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [scrollPosition, lastScrollTop]);

	return (
		<div ref={divRef} style={{ height: "300px", overflow: "scroll" }}>
			{/* Content with a large scrollable height */}
			<div style={{ height: "10000000px" }}>
				Scroll Position: {scrollPosition}px
				<br />
				Scroll Velocity: {scrollVelocity.toFixed(2)}
			</div>
		</div>
	);
};

export default ScrollTrackingDiv;
