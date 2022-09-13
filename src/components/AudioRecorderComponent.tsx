import React, { useEffect, useRef, useState } from "react";
import { Player, Channel, Recorder } from "tone";
import { inputs, outputs } from "../utils/constants";

function AudioRecorderComponent() {
	const channel = useRef<Channel>(new Channel());
	const inputChannel = useRef<Channel>(new Channel());
	const recorder = useRef<Recorder>(new Recorder());
	const [recording, setRecording] = useState(false);

	useEffect(() => {
		inputChannel.current.receive(inputs.audioIn);
		inputChannel.current.connect(recorder.current);

		channel.current.send(outputs.channel1, 0);
		channel.current.volume.rampTo(-6, 0.1);
		return () => {
			console.log("Component unmounted, cleanup?", channel.current);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			channel.current.volume.rampTo(-Infinity, 0.1);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			recorder.current.stop();
		};
	}, []);

	useEffect(() => {}, []);

	return (
		<div
			className="upper-content recorder-audio-component"
			onClick={async () => {
				if (!recording) {
					recorder.current.start();
					setRecording(true);
				} else {
					recorder.current.stop().then((recording) => {
						const url = URL.createObjectURL(recording);
						console.log("Recording finished, url is: ", url);
						const player = new Player({
							url: url,
							loop: false,
							onload: () => {
								console.log("buffer loaded");
								player.start();
							},
							onstop: () => {
								player.dispose();
							},
						});
						player.connect(channel.current);
					});
					setRecording(false);
				}
			}}
		>
			<p>EN Ljudinspelare</p>
			<div>{recording ? "Recording" : "Click to start recording"}</div>
		</div>
	);
}

export default AudioRecorderComponent;
