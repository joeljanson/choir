import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SopranoNotes } from "../assets/images/notes/dorico.svg";
import { Player, Volume, gainToDb, ToneAudioBuffers } from "tone";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../css/SimpleText.scss";

/* import VideoPlayer from "./Video"; */

/* const roses = require("../assets/roses.mp4"); */
//const soprano = require("../assets/images/notes/soprano_test.svg");

type SimpleTextProps = {
	buffers: ToneAudioBuffers;
};

function SimpleText({ buffers }: SimpleTextProps) {
	const divRef = useRef<HTMLDivElement>(null);
	const myVol = useRef<Volume | null>(null);
	const lastFrameVelocity = useRef<number>(0); // To store the velocity of the last frame
	const lastFramePosition = useRef<number>(0); // To store the position of the last frame
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const [scrollVelocity, setScrollVelocity] = useState<number>(0);
	const [scrollRatio, setScrollRatio] = useState<number>(0.005);

	// Function to handle scroll events
	const handleScroll = () => {
		console.log("scrolling");
		if (divRef.current) {
			// Just update the current scroll position
			const newScrollPosition = divRef.current.scrollTop;
			setScrollPosition(newScrollPosition);

			if (newScrollPosition > 1500) {
				console.log("Scroll bigger than 1500!");
				/* if (singlePlayer.current && singlePlayer.current.state !== "started") {
					singlePlayer.current.start();
				} */
			}
		}
	};

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.to("#first", {
			scrollTrigger: {
				trigger: "#first",
				scroller: "#scroller",
				start: "top 50%",
				end: "bottom bottom",
				scrub: true,
				markers: true,
				onEnter: ({ progress, direction, isActive }) => {
					const buffer = buffers.get("clairdelune");
					const player = new Player({
						url: buffer,
						autostart: true,
					}).toDestination();
					player.start();
					console.log(player);
					console.log(progress, direction, isActive);
				},
			},
		});

		gsap.to("#claire", {
			scrollTrigger: {
				trigger: "#claire",
				scroller: "#scroller",
				start: "top 50%",
				end: "bottom bottom",
				scrub: true,
				markers: true,
				onEnter: ({ progress, direction, isActive }) =>
					console.log(progress, direction, isActive),
			},
		});

		const currentDivNode = divRef.current;
		console.log("Simpletext buffers: ", buffers);

		if (currentDivNode) {
			currentDivNode.addEventListener("scroll", handleScroll);

			// Clean up the listener when the component unmounts
			return () => {
				currentDivNode.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);

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
					Scroll Position: {scrollPosition}px
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
