import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SopranoNotes } from "../assets/images/notes/dorico.svg";
import { Player, Volume, gainToDb } from "tone";
import { adagio, ljudbild4 } from "../utils/AudioFiles";

import "../css/ScrollTracking.scss";
import "../css/ScrollTracking.scss";
import DroneGrainPlayer from "../utils/DroneGrainPlayer";
import VideoPlayer from "./Video";

const roses = require("../assets/roses.mp4");
//const soprano = require("../assets/images/notes/soprano_test.svg");

const ScrollTrackingDiv: React.FC = () => {
	const divRef = useRef<HTMLDivElement>(null);
	const myVol = useRef<Volume | null>(null);
	const player = useRef<DroneGrainPlayer | null>(null);
	const lastFrameVelocity = useRef<number>(0); // To store the velocity of the last frame
	const lastFramePosition = useRef<number>(0); // To store the position of the last frame
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const [scrollVelocity, setScrollVelocity] = useState<number>(0);

	// Function to handle scroll events
	const handleScroll = () => {
		if (divRef.current) {
			// Just update the current scroll position
			const newScrollPosition = divRef.current.scrollTop;
			setScrollPosition(newScrollPosition);

			if (newScrollPosition > 10000) {
				//console.log("Scroll bigger than 10000!");
			}
			const scrollPosition = newScrollPosition;
			const parallaxElement = document.getElementById("parallax");
			if (parallaxElement) {
				//parallaxElement.style.top = `${100 - scrollPosition * 0.5}px`;
				parallaxElement.style.top = `${100 - scrollPosition * 0.005}px`;
			}
		}
	};

	useEffect(() => {
		const currentDivNode = divRef.current;

		if (currentDivNode) {
			// setTimeout(() => {
			// 	console.log("Setting scrolltop!");
			// 	currentDivNode.scrollTop = 500000;
			// }, 1000);
			// Add scroll event listener when the component mounts
			currentDivNode.addEventListener("scroll", handleScroll);
			const volume = new Volume(-Infinity).toDestination();
			myVol.current = volume;
			const intPlayer = new DroneGrainPlayer({
				url: adagio,
				frequency: 0.1, // Maybe change these into global variables?
				grainSize: 0.5, // Maybe change these into global variables?
				overlap: 0.1,
				loop: true,
				onload: () => {
					console.log("Ljudbild Audio loaded");
					//intPlayer.playbackRate = 1;
					intPlayer.start();
				},
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
			if (scrollPosition <= 0) {
				return;
			}
			// Calculate the change in scroll position since the last frame
			const scrollChange = scrollPosition - lastFramePosition.current;

			// Calculate the scroll velocity as a value between 0 and 1
			// You can adjust the factor (e.g., 0.01) to control the sensitivity
			let velocity = Math.abs(scrollChange) * 0.01;
			//console.log("Scrollposition is: ", scrollPosition);
			// Lerp the velocity value
			velocity =
				(1 - lerpFactor) * lastFrameVelocity.current + lerpFactor * velocity;

			//console.log("lastFramePosition is: ", lastFramePosition);
			//console.log("scrollPosition is: ", scrollPosition);
			//console.log("scrollChange is: ", scrollChange);

			lastFrameVelocity.current = velocity;
			lastFramePosition.current = scrollPosition;

			const mappedVelocity = mapValue(velocity, 0, 1, 0.5, 1);
			//console.log(mappedVelocity);

			if (velocity > 0) {
				//console.log(gainToDb(velocity));
				const vol = mappedVelocity > 1 ? 1 : mappedVelocity;
				// let playbackRate = mappedVelocity > 1 ? 1 : mappedVelocity;
				// playbackRate = playbackRate < 0.5 ? 0.5 : playbackRate;
				const volume = (lastFramePosition.current / 1000000) * 1;
				myVol.current?.volume.rampTo(gainToDb(volume), 1);
				if (player.current) {
					const position =
						(lastFramePosition.current / 1000000) *
						player.current.buffer.duration;
					//console.log(position);
					player.current.updateScrubPosition(position);
					//player.current.playbackRate = playbackRate;
					//player.current.start(0, position);
					//console.log(playbackRate);
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
			myVol.current?.volume.rampTo(gainToDb(0), 1);
		};
	}, [scrollPosition]);

	return (
		<div className="infinite-scrollbar">
			{/* Content with a large scrollable height */}
			<div className="scroll-content" ref={divRef}>
				{/* <div
					style={{
						position: "absolute",
						backgroundColor: "white",
						color: "black",
						padding: "20px",
						zIndex: "999",
						width: "100%",
					}}
				>
					Scroll Position: {scrollPosition}px
					<br />
					Scroll Velocity: {scrollVelocity.toFixed(2)}
					<br />
					Volume: {myVol.current?.volume.value.toFixed(2)}
				</div> */}
				<div id="parallax">
					<p>
						Här kommer det vara en lång inledande text som ger sångarna lite
						kontext till stycket. Tanken är att det ska handla om minnen och det
						ska finnas ett berättarjag. När sångaren scrollar nedåt på sidan så
						kommer volymen på en granulär synt att höjas. Den granulära synten
						spelar nu ett testljud från en stråkkvartett jag jobbade på i våras.
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						Blandat med text kommer det vara en och annan bild att scrolla
						förbi. De olika stämmorna kommer att ha olika längd på texten så att
						altstämman till exempel kommer snabbare till sina noter som då
						innehåller en queue från sopran 1 som bestämmer tempo och leder
						resten av kören in i ett sjunget parti.
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
					</p>
					{/* <img
						alt="From unsplash"
						src={
							"https://images.unsplash.com/photo-1570450483095-80261f758e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2957&q=80"
						}
					></img> */}
					<p>Sing the notes below</p>
					<div className="svg-holder">
						<SopranoNotes />
					</div>
					{/* <VideoPlayer src={roses} /> */}
					When I walk alone, the consequences of every good or bad choice I make
					fall entirely on me: a responsibility and a freedom. As a woman and a
					mother, I rarely only have to consider what I want and need without
					having to first attend to other people. I know there are risks, but
					each time I come out of that “forest”, I feel stronger and more
					confident. Weighed against the simple daily rhythms of a long-distance
					walk and the joy and wonder I experience, risk – reasonable risk –
					becomes a small part of the equation, and one I am willing to accept.
					Many things frightened me as I made my way from the Channel through
					France, over the Alps in Switzerland, and across northern Italy to
					Rome. Some were rational fears – aggressive dogs (only two, called off
					by owners), a cash machine eating my card (didn’t happen), getting
					lost (an occasional, correctable problem); some weren’t.
				</div>
				<div style={{ height: "10000px" }}></div>
				<div style={{ height: "10000000px" }}></div>
			</div>
		</div>
	);
};

export default ScrollTrackingDiv;
