import React, { useEffect, useRef, useState } from "react";
import { Player, Channel, ToneAudioBuffer, gainToDb, now } from "tone";
import { outputs } from "../../utils/constants";
import "../../css/PlayerComponent.scss";

type PlayerComponentProps = {
	buffer: ToneAudioBuffer;
};

function PlayerComponent({ buffer }: PlayerComponentProps) {
	const channel = useRef<Channel>(new Channel());
	//const [audioLoaded, setAudioLoaded] = useState(false);

	const [clickCount, setClickCount] = useState<number>(0);

	//Temporary props
	const [fade, setFade] = useState(false);

	useEffect(() => {
		channel.current.send(outputs.channel1, gainToDb(1));
		//channel.current.toDestination();
		channel.current.volume.rampTo(gainToDb(1), 0.1);
		const currChannel = channel.current;
		return () => {
			currChannel.volume.rampTo(gainToDb(0), 10.1);
			// currChannel.dispose();
			console.log("Component unmounted, cleanup?", currChannel);
		};
	}, []);

	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		// Detect if the device is a touch device
		const detectTouchDevice = () => {
			if ("ontouchstart" in window) {
				setIsTouchDevice(true);
			} else {
				setIsTouchDevice(false);
			}
		};

		// Call the detection function when the component mounts
		detectTouchDevice();

		// You can also listen for changes in orientation or screen size
		window.addEventListener("orientationchange", detectTouchDevice);
		window.addEventListener("resize", detectTouchDevice);

		// Remove the event listeners when the component unmounts
		return () => {
			window.removeEventListener("orientationchange", detectTouchDevice);
			window.removeEventListener("resize", detectTouchDevice);
		};
	}, []);

	// useEffect(() => {
	// 	console.log(buffer);
	// 	buffer = buffer;
	// 	setAudioLoaded(true);
	// }, [buffer]);

	if (!buffer) return <div>No channel or buffer</div>;

	function playAudio() {
		const player = new Player({
			url: buffer,
			loop: false,
			onstop: (thisPlayer) => {
				//player.disconnect(channel.current);
				thisPlayer.dispose();
			},
			onload: () => {},
			//}).connect(channel.current);
		}).toDestination();
		player.start();
		console.log("Is there a slight latency??");
		console.log("should sound, click count is: ", clickCount);
		console.log("should sound, channel.current is: ", channel.current);
		setClickCount(clickCount + 1);
		setFade(true);
	}

	return (
		<div
			className={"player-component"}
			// tabIndex={0}
			// onKeyDown={() => {
			// 	const player = new Player({
			// 		url: buffer,
			// 		loop: false,
			// 		onstop: () => {
			// 			player.disconnect(channel.current);
			// 			player.dispose();
			// 		},
			// 	}).connect(channel.current);
			// 	player.start();
			// 	console.log("should sound, click count is: ", clickCount);
			// 	console.log("should sound, channel.current is: ", channel.current);
			// 	setClickCount(clickCount + 1);
			// 	setFade(true);
			// }}
			onTouchStart={isTouchDevice ? playAudio : undefined}
			onMouseDown={!isTouchDevice ? playAudio : undefined}
		>
			<p>{isTouchDevice ? "Press" : "Click"} anywhere to play sounds</p>
		</div>
	);
}

export default PlayerComponent;
