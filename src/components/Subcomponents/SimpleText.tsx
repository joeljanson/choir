import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SopranoNotes } from "../assets/images/notes/dorico.svg";
import { Player, Volume, gainToDb, ToneAudioBuffers, BufferSource } from "tone";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../css/SimpleText.scss";
import { getComponent } from "./ComponentMapping";
import IntroductionText from "./voices/Introduction";

/* import VideoPlayer from "./Video"; */

/* const roses = require("../assets/roses.mp4"); */
//const soprano = require("../assets/images/notes/soprano_test.svg");

type SimpleTextProps = {
	buffers: ToneAudioBuffers;
	partName: string;
	place: string;
};

type RandomPercentageEntry = {
	percentage: number;
	bufferUrl: string;
	playEntire: boolean;
};

function SimpleText({ buffers, partName, place }: SimpleTextProps) {
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
						if (playEntire) {
							source.start("+0.1"); // Start immediately, at the random start time, for 4 seconds
						} else {
							console.log("Random start time is:", randomStartTime);
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
					<IntroductionText />
					{getComponent(partName, place)}
				</div>
			</div>
		</div>
	);
}

export default SimpleText;
