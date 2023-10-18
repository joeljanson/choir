import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SopranoNotes } from "../assets/images/notes/dorico.svg";
import { Player, Volume, gainToDb, ToneAudioBuffers, BufferSource } from "tone";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../css/SimpleText.scss";

/* import VideoPlayer from "./Video"; */

/* const roses = require("../assets/roses.mp4"); */
//const soprano = require("../assets/images/notes/soprano_test.svg");

type SimpleTextProps = {
	buffers: ToneAudioBuffers;
};

type RandomPercentageEntry = {
	percentage: number;
	bufferUrl: string;
	playEntire: boolean;
};

function SimpleText({ buffers }: SimpleTextProps) {
	const divRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const [randomPercentages, setRandomPercentages] = useState<
		RandomPercentageEntry[]
	>([]);
	const [triggeredPercentages, setTriggeredPercentages] = useState<
		RandomPercentageEntry[]
	>([]);

	const handleScroll = () => {
		//console.log("scrolling");
		if (divRef.current) {
			// Update the current scroll position
			const newScrollPosition = divRef.current.scrollTop;

			// Calculate the scrollable height
			const scrollableHeight =
				divRef.current.scrollHeight - divRef.current.clientHeight;

			// Calculate the scroll percentage
			const scrollPercentage = (newScrollPosition / scrollableHeight) * 100;

			//console.log("Scrollpercentage is: ", scrollPercentage);
			//console.log("We passed this percentage: ", randomPercentages);
			randomPercentages.forEach((number) => {
				const { percentage, bufferUrl, playEntire } = number;
				if (
					scrollPercentage >= percentage &&
					!triggeredPercentages.includes(number)
				) {
					console.log(`We passed this percentage: ${number}`);
					console.log(`triggeredPercentagese: ${triggeredPercentages}`);

					const atmosBuffer = buffers.get(bufferUrl); // Assuming 'atmos' is the key for your buffer
					if (atmosBuffer) {
						console.log("Buffer atmos exists!");
						const bufferDuration = atmosBuffer.duration;
						const randomStartTime = Math.random() * (bufferDuration - 4); // Subtract 4 to ensure 4-second playtime

						const source = new BufferSource({
							url: atmosBuffer,
							// any additional properties you want to set
						}).toDestination();
						console.log("Random start time is:", randomStartTime);
						if (playEntire) {
							source.start("+0.1"); // Start immediately, at the random start time, for 4 seconds
						} else {
							source.start("+0.1", randomStartTime, 4); // Start immediately, at the random start time, for 4 seconds
						}
					}
					// Add the triggered percentage to the state
					setTriggeredPercentages([...triggeredPercentages, number]);
				}
			});

			setScrollPosition(scrollPercentage);
		}
	};

	// Function to generate random number in a given range
	const getRandomInRange = (min: number, max: number): number => {
		return Math.random() * (max - min) + min;
	};

	useEffect(() => {
		// Define your ranges
		// Define your ranges with additional 'bufferUrl' field
		const ranges = [
			{ min: 2, max: 5, bufferUrl: "atmos" },
			{ min: 10, max: 20, bufferUrl: "stinger1" },
			// Add more ranges as needed
		];

		// Generate random percentages and buffer names for each range
		const randomPercentages = ranges.map((range) => ({
			percentage: getRandomInRange(range.min, range.max),
			bufferUrl: range.bufferUrl,
			playEntire: range.bufferUrl.includes("stinger"),
		}));

		// Update the state
		setRandomPercentages(randomPercentages);
	}, []);

	useEffect(() => {
		const currentDivNode = divRef.current;
		console.log("Simpletext buffers: ", buffers);

		if (currentDivNode) {
			currentDivNode.addEventListener("scroll", handleScroll);

			// Clean up the listener when the component unmounts
			return () => {
				currentDivNode.removeEventListener("scroll", handleScroll);
			};
		}
	}, [randomPercentages, triggeredPercentages]);

	return (
		<div className="simple-text">
			<div id="scroller" className="scroll-content" ref={divRef}>
				<div
					style={{
						position: "absolute",
						backgroundColor: "white",
						color: "black",
						padding: "20px",
						zIndex: "999",
						width: "100%",
					}}
				>
					Scroll Position: {scrollPosition.toFixed()}%
					{/* Volume: {myVol.current?.volume.value.toFixed(2)} */}
				</div>
				<div id="parallax-simpletext">
					<br />
					<br />
					<br />
					<br />
					<h1>Introduction</h1>
					<p>
						This piece is about a trip. A long drive from the east coast of the
						United States of America to the west. This first part of the piece
						is you scrolling and reading through the text. Read it in your own
						time. Also, be sure to read this and all of the following text every
						time the piece is performed. So that you just don't scroll past it.
					</p>
					<p>
						At times you will see text that look like this:{" "}
						<span>This is how the text looks like, orange and big. </span>
						This is text that you are supposed to read out loud (never read the
						above text though). Phrase these words in any manner that you want
						but make sure to articulate it and say it loud so that the audience
						can hear your voice over what's going on in the speakers.
					</p>
					<p id="first">
						In the speakers, initially the audio coming from the speakers will
						be recordings representing the sounds that are somehow connected to
						the text. For example, if you have gotten the text that is about Las
						Vegas, the audio coming from your speaker will be sounds from a
						casino. One audio file might already have been triggered, the piece
						has begun!
					</p>
					<p>
						Worth mentioning is also that you will get different parts of the
						story each time this piece is performed, so sometimes you might get
						the text about Las Vegas, sometimes you will read about arriving in
						San Fransisco. At some point, after many rehearsals or performances,
						you will have a more complete story. With that said, let's get
						started.
					</p>
					<br />
					<br />
					<br />
					<br />
					<br />
					<h1>Chapter one</h1>
					<p>
						Not far from Las Vegas, the five of us in the car. I sat in the
						passenger seat and <span>in the corner of my eye</span> I saw a bus
						right next to our car. You didn’t notice it and put the blinkers on
						to change lanes. Such a thin line. We drove for a bit more before
						switching and I took over the driving. You apologized again for not
						seeing the bus and for once thanked me for being a backseat driver.
						We had about an hour left before turning onto{" "}
						<span>the strip.</span>
					</p>
					<p>
						We lived, of course, inside one of the casinos. Paris Las Vegas
						Hotel it was called. From the window of one of our rooms, we could
						see the Bellagio fountain. It made me think of{" "}
						<span className="no-span" id="claire">
							Claire de Lune
						</span>
						, and plotting, scheming. Oceans eleven. Childhood and cluelessness.
					</p>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<h1>Chapter two</h1>
					<p>
						Not far from Las Vegas, the five of us in the car. I sat in the
						passenger seat and <span>in the corner of my eye</span> I saw a bus
						right next to our car. You didn’t notice it and put the blinkers on
						to change lanes. Such a thin line. We drove for a bit more before
						switching and I took over the driving. You apologized again for not
						seeing the bus and for once thanked me for being a backseat driver.
						We had about an hour left before turning onto{" "}
						<span>the strip.</span>
					</p>
					<p>
						We lived, of course, inside one of the casinos. Paris Las Vegas
						Hotel it was called. From the window of one of our rooms, we could
						see the Bellagio fountain. It made me think of{" "}
						<span className="no-span" id="claire">
							Claire de Lune
						</span>
						, and plotting, scheming. Oceans eleven. Childhood and cluelessness.
					</p>
					{/* <button
						onClick={() => {
							console.log("Hello!");
						}}
					>
						Click me!
					</button> */}
				</div>
			</div>
		</div>
	);
}

export default SimpleText;
