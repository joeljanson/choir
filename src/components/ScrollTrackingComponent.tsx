import React, { useEffect, useRef, useState } from "react";
import { Player, Volume, gainToDb } from "tone";
import { adagio, ljudbild4 } from "../utils/AudioFiles";
import { everything } from "../utils/AudioFiles";

import "../css/ScrollTracking.scss";
import DroneGrainPlayer from "../utils/DroneGrainPlayer";

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
				//parallaxElement.style.top = `${100 - scrollPosition * 0.005}px`;
				parallaxElement.style.top = `${100 - scrollPosition * 0.005}px`;
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

			const mappedVelocity = mapValue(velocity, 0, 1, 0, 1);
			//console.log(mappedVelocity);

			if (velocity > 0) {
				//console.log(gainToDb(velocity));
				const vol = mappedVelocity > 1 ? 1 : mappedVelocity;
				let playbackRate = mappedVelocity > 1 ? 1 : mappedVelocity;
				playbackRate = playbackRate < 0.5 ? 0.5 : playbackRate;
				myVol.current?.volume.rampTo(gainToDb(vol), 1);
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
				<div
					style={{
						position: "absolute",
						backgroundColor: "white",
						color: "black",
						padding: "20px",
					}}
				>
					Scroll Position: {scrollPosition}px
					<br />
					Scroll Velocity: {scrollVelocity.toFixed(2)}
					<br />
					Volume: {myVol.current?.volume.value.toFixed(2)}
				</div>
				<div id="parallax">
					<p>
						The path, more of a faint depression in the field I had just
						crossed, disappeared into a wood: yes, I could see an opening in the
						vegetation. The day before, I had left the official walking route of
						the Via Francigena, an ancient pilgrimate route from Canterbury to
						Rome, to stay at a B&B that was highly rated and affordable. Early
						next morning, after stuffing my pockets with the breakfast my
						hostess had set out for me, I cracked open the massive gate in the
						wall surrounding the little country compound and sneaked through.
						The village was quiet. Not even roosters were up as I found my
						stride on a dirt path that would, according to Google, take me back
						to the route. All I had to do was follow the track that cut south
						through a forest that showed on the map as a fairly small green blob
						between me and my destination. No problem. Except that Google and I
						were a little lost. Or, more accurately, the signal was sketchy, and
						I was not 100% sure this was the right way. Liz takes a breather on
						the ancient Via Francigena to Rome Walking the pilgrim's path to
						Rome Read more I stepped between the trees into a Little Red Riding
						Hood gloom and hummed a nonsense song. I am more than capable of
						freaking myself out. A sign nailed to a tree gave me hope. All sorts
						of labelled and well-maintained paths run through the patches of
						forest that dot the rolling, mostly agricultural French landscape
						I’d been walking through for the past week. This sign was not a
						label, however. Beware, it warned, but I couldn’t make out the other
						words. Wolves? Wild pigs? I managed to catch a blink of signal and
						Google Translate informed me that I should watch out for traps. OK,
						I thought, as long as I stay on the path. Which, of course, petered
						out after a few hundred metres. I could backtrack, return to the
						village and take the long way around, which would add several hours
						to a day I already expected to be long, or I could forge ahead,
						using flashes of sun for bearings. I heard my husband’s voice in my
						head, something about the sunk cost fallacy. I picked up a fairly
						long and sturdy stick and, stirring the ground cover ahead of me,
						stepped carefully through the low tangle of brush, keeping the sun,
						what I could make of it, to my left. I banished all thoughts of
						steel traps, shredded ankle tendons and long hospital stays. But a
						moment of panic sucked the breath from my chest. If I did step on a
						trap, there would be no way to call for help. After some time, the
						trees thinned, more sunlight reached the forest floor, which I
						continued to probe, and then I was literally out of the woods. I
						laid my stick aside and pulled out one of Madame’s breakfast
						croissants, which was slightly crushed but delicious, with its
						layers of butter and relief. As a woman and a mother, it is rare to
						only have to consider what I want and need without having to first
						attend to so many other people Had I been scared? I’d definitely
						felt the prick of heightened alertness. In hindsight, taking the
						shortcut might have been marginally or royally stupid. Certainly, it
						was a challenge, but one I felt up to, and while it may be unclear
						how much luck played a part, I did manage to come out in one piece.
						Mostly, I think, I was too busy paying attention to be afraid.
					</p>
					<img
						alt="From unsplash"
						src="https://i.pinimg.com/474x/89/13/99/891399ca3ea670fab895d9a8a4ee4257.jpg"
					></img>
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
