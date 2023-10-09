import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as SopranoNotes } from "../assets/images/notes/dorico.svg";
import { Player, Volume, gainToDb } from "tone";

import "../../css/SimpleText.scss";

/* import VideoPlayer from "./Video"; */

/* const roses = require("../assets/roses.mp4"); */
//const soprano = require("../assets/images/notes/soprano_test.svg");

const SimpleText: React.FC = () => {
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
			const scrollPosition = newScrollPosition;
			const parallaxElement = document.getElementById("parallax");
			if (parallaxElement) {
				console.log(-scrollPosition);
				//parallaxElement.style.top = `${100 - scrollPosition * 0.5}px`;
				parallaxElement.style.top = `${-scrollPosition * scrollRatio}px`;
			}
		}
	};

	useEffect(() => {
		const currentDivNode = divRef.current;

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
			<div className="scroll-content" ref={divRef}>
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
					<p>
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
						see the Bellagio fountain. It made me think of Claire de Lune, and
						plotting, scheming. Oceans eleven. Childhood and cluelessness.
					</p>
					{/* <button
						onClick={() => {
							console.log("Hello!");
						}}
					>
						Click me!
					</button> */}
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
						When you've gotten to here, sing section A in the score and then
						once you've finished, press the arrow below to go to the next
						section.
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
			</div>
		</div>
	);
};

export default SimpleText;
