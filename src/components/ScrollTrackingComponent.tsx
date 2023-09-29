import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SopranoNotes } from "../assets/images/notes/dorico.svg";
import { Player, Volume, gainToDb } from "tone";
import { adagio, programblad } from "../utils/AudioFiles";

import "../css/ScrollTracking.scss";
import "../css/ScrollTracking.scss";
import DroneGrainPlayer from "../utils/DroneGrainPlayer";
/* import VideoPlayer from "./Video"; */

/* const roses = require("../assets/roses.mp4"); */
//const soprano = require("../assets/images/notes/soprano_test.svg");

const ScrollTrackingDiv: React.FC = () => {
	const divRef = useRef<HTMLDivElement>(null);
	const heightRef = useRef<HTMLDivElement>(null);
	const parallaxRef = useRef<HTMLDivElement>(null);
	const myVol = useRef<Volume | null>(null);
	const player = useRef<DroneGrainPlayer | null>(null);
	const singlePlayer = useRef<Player | null>(null);
	const lastFrameVelocity = useRef<number>(0); // To store the velocity of the last frame
	const lastFramePosition = useRef<number>(0); // To store the position of the last frame
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const [scrollVelocity, setScrollVelocity] = useState<number>(0);
	const [scrollRatio, setScrollRatio] = useState<number>(0.005);
	const [totalHeight, setTotalHeight] = useState<number>(100000);

	// Function to handle scroll events
	const handleScroll = () => {
		if (divRef.current) {
			// Just update the current scroll position
			const newScrollPosition = divRef.current.scrollTop;
			setScrollPosition(newScrollPosition);

			if (newScrollPosition > 10000) {
				//console.log("Scroll bigger than 10000!");
				/* if (singlePlayer.current && singlePlayer.current.state !== "started") {
					singlePlayer.current.start();
				} */
			}
			const scrollPosition = newScrollPosition;
			const parallaxElement = document.getElementById("parallax");
			if (parallaxElement) {
				//parallaxElement.style.top = `${100 - scrollPosition * 0.5}px`;
				parallaxElement.style.top = `${-scrollPosition * scrollRatio}px`;
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

			const volume = new Volume(-Infinity).toDestination();
			myVol.current = volume;
			const intPlayer = new DroneGrainPlayer({
				url: programblad,
				frequency: 0.1, // Maybe change these into global variables?
				grainSize: 0.5, // Maybe change these into global variables?
				overlap: 0.1,
				loop: true,
				onload: () => {
					console.log("Ljudbild Audio loaded");
					currentDivNode.addEventListener("scroll", handleScroll);
					//intPlayer.playbackRate = 1;
					intPlayer.start();
				},
			}).connect(volume);
			player.current = intPlayer;

			/* const intSinglePlayer = new Player({
				url: programblad,
				loop: false,
				onload: () => {
					console.log("Ljudbild Audio loaded");
				},
			}).toDestination();
			singlePlayer.current = intSinglePlayer; */

			// Clean up the listener when the component unmounts
			return () => {
				currentDivNode.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);

	useEffect(() => {
		console.log("Div ref is: ", divRef.current?.clientHeight);
		console.log("Height ref is: ", heightRef.current?.clientHeight);
		if (heightRef.current?.clientHeight && parallaxRef.current?.clientHeight) {
			/* console.log(
				"parallaxRef ref is: ",
				parallaxRef.current?.clientHeight / scrollRatio
			); */
			const actualHeight =
				(parallaxRef.current?.clientHeight -
					(divRef.current?.clientHeight! -
						divRef.current?.clientHeight! * scrollRatio)) /
				scrollRatio;
			//const actualHeight = parallaxRef.current?.clientHeight / scrollRatio;
			heightRef.current.style.height = actualHeight + "px";
		}

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
			lastFramePosition.current =
				scrollPosition + divRef.current?.clientHeight!;

			const mappedVelocity = mapValue(velocity, 0, 1, 0.5, 1);
			//console.log(mappedVelocity);

			if (velocity > 0) {
				//console.log(gainToDb(velocity));
				const vol = mappedVelocity > 1 ? 1 : mappedVelocity;
				// let playbackRate = mappedVelocity > 1 ? 1 : mappedVelocity;
				// playbackRate = playbackRate < 0.5 ? 0.5 : playbackRate;
				const actualHeight = heightRef.current?.clientHeight!;
				const volume = (lastFramePosition.current / actualHeight / 2) * 1;
				myVol.current?.volume.rampTo(gainToDb(volume), 1);
				if (player.current) {
					let position =
						(lastFramePosition.current / actualHeight) *
						player.current.buffer.duration;
					console.log(
						"Player position: ",
						lastFramePosition.current / actualHeight
					);
					position =
						position >= player.current.buffer.duration
							? player.current.buffer.duration
							: position;
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
				<div id="parallax" ref={parallaxRef}>
					<br />
					<br />
					<br />
					<br />
					<h1>The Enigmatic Universe of Numbers</h1>
					<p>
						Imagine stepping into a realm where the very fabric of reality is
						woven with numbers. A place where numbers are not just digits on a
						screen or scribbles on paper, but the very essence of existence.
						Welcome to the captivating universe of numbers!
						<br />
						<br />
						<br />
						<img src="https://images.unsplash.com/photo-1502570149819-b2260483d302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bnVtYmVyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" />
						<br />
						<br />
						<br />
					</p>
					<h2>The Building Blocks of Reality</h2>
					<p>
						Numbers are the building blocks of our universe. Think about it:
						from the speed of light (approximately 3 × 1 0 8 3×10 8 meters per
						second) to the golden ratio ( ϕ=1.618033988749895...), numbers are
						the language through which the cosmos communicates. They're the DNA
						of the universe, encoding the laws that govern everything from the
						tiniest subatomic particles to the most massive galaxies.
						<br />
						<br />
						<br />
						<img src="https://images.unsplash.com/photo-1575096865054-07396378e082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwcmF0aW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" />
						<br />
						<br />
						<br />
					</p>
					<h2>The Mystical and the Mathematical</h2>
					<p>
						Numbers have fascinated humans for millennia, not just as tools for
						counting or measuring, but also as symbols of deeper, mystical
						truths. The ancient Pythagoreans revered numbers, believing that
						they held the secrets to the universe. The number three, for
						example, symbolized completeness—beginning, middle, and end. The
						number seven was considered sacred and appeared frequently in
						religious texts and rituals.
						<br />
						<br />
						<br />
						<img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWF0aHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" />
						<br />
						<br />
						<br />
					</p>
					<h2>The Art of Numbers</h2>
					<p>
						Numbers are not just cold, lifeless entities; they have an aesthetic
						quality that has inspired artists and musicians. Take the Fibonacci
						sequence, a series of numbers where each number is the sum of the
						two preceding ones: 0 , 1 , 1 , 2 , 3 , 5 , 8 , 13 , 21 , …
						0,1,1,2,3,5,8,13,21,…. This sequence is not just a mathematical
						curiosity; it appears in nature, in the spirals of sunflowers and
						the branching of trees. Musicians like Johann Sebastian Bach have
						even used mathematical structures to compose timeless pieces.
						<br />
						<br />
						<br />
						<img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg" />
						<br />
						<br />
						<br />
					</p>
					<h2>The Uncanny and the Irrational</h2>
					<p>
						But numbers also have their quirks and mysteries. Consider
						irrational numbers like π and e, numbers that cannot be expressed as
						simple fractions and whose decimal representations go on forever
						without repeating. They challenge our intuitive understanding of
						numbers and yet are fundamental to equations that describe natural
						phenomena.
						<br />
						<br />
						<br />
						<img src="https://comcath.se/wp-content/uploads/2016/03/pi4.gif" />
						<br />
						<br />
						<br />
					</p>
					<h2>Numbers in the Digital Age</h2>
					<p>
						In our modern world, numbers have found a new playground: the realm
						of computers and algorithms. Here, numbers are more than just
						quantities; they are data points, pixels, and lines of code that
						create virtual worlds, simulate complex systems, and even compose
						music. As a composer, you might find it intriguing how algorithmic
						composition uses mathematical models to generate musical pieces,
						blending the worlds of numbers and art in a harmonious symphony.
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
					</p>
					<h2>The Future: Numbers Unveiling the Unknown</h2>
					<p>
						As we venture into the unknown territories of quantum mechanics and
						explore the far reaches of the universe, numbers will continue to be
						our guiding light. They will help us decode the mysteries that are
						yet to be unraveled, acting as the keys to doors we didn't even know
						existed.
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
					</p>
					<h2>Fin</h2>
					<p>
						Numbers are not just abstract concepts; they are the heartbeat of
						the universe, the poetry of reality, and the brushstrokes in the
						masterpiece that is our world. They are as complex and diverse as
						the life forms that inhabit our planet and as enigmatic and infinite
						as the cosmos itself. So the next time you encounter a number,
						remember: you're not just looking at a digit; you're glimpsing a
						piece of the cosmic puzzle.
						<br />
						<br />
					</p>
					<br />
					{/* <img
						alt="From unsplash"
						src={
							"https://images.unsplash.com/photo-1570450483095-80261f758e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2957&q=80"
						}
					></img> */}
					{/* <p>Sing the notes below</p>
					<div className="svg-holder">
						<SopranoNotes />
					</div> */}
					{/* <VideoPlayer src={roses} /> */}
				</div>
				{/* <div style={{ height: "10000px" }}></div> */}
				{/* <div style={{ height: "10000000px" }}></div> */}
				<div style={{ height: totalHeight + "px" }} ref={heightRef}></div>
			</div>
		</div>
	);
};

export default ScrollTrackingDiv;
