import React, { useEffect, useRef, useState } from "react";
import { Player, Channel, ToneAudioBuffer } from "tone";
import { outputs } from "../utils/constants";
import "../css/TextMessageAudioComponent.scss";

type TextMessageAudioComponentProps = {
	buffers: ToneAudioBuffer[];
};

function TextMessageAudioComponent({
	buffers,
}: TextMessageAudioComponentProps) {
	const channel = useRef<Channel>(new Channel());
	const buffer = useRef<ToneAudioBuffer>();
	const [audioLoaded, setAudioLoaded] = useState(false);

	useEffect(() => {
		channel.current.send(outputs.channel1, 0);
		channel.current.volume.rampTo(-6, 0.1);
		return () => {
			console.log("Component unmounted, cleanup?", channel.current);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			channel.current.volume.rampTo(-Infinity, 0.1);
		};
	}, []);

	useEffect(() => {
		console.log(buffers);
		if (!buffers.length) return;
		buffer.current = buffers[0];
		setAudioLoaded(true);
	}, [buffers]);

	if (!audioLoaded) return <div>No channel or buffer</div>;

	return (
		<div
			className="upper-content textMessageAudioComponent"
			onClick={async () => {
				const player = new Player({
					url: buffer.current,
					loop: false,
					onstop: () => {
						player.disconnect(channel.current);
						player.dispose();
					},
				}).connect(channel.current);
				player.start();
				console.log("should sound");
			}}
		>
			<h1>EN LJUDSPELARE</h1>
		</div>
	);
}

export default TextMessageAudioComponent;
