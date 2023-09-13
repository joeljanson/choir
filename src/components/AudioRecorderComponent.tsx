import React, { useEffect, useRef, useState } from "react";
import { Player, Channel, Buffer, Recorder } from "tone";
import { inputs, outputs } from "../utils/constants";
import { normalize } from "../utils/Audio";

//Import scss
import "../css/AudioRecorder.scss";

export type AudioRecorderComponentProps = {
	/**
	 * A delay in seconds before the recording starts
	 */
	recordingDelay: number;
	/**
	 * How long the duration of the recording should be in seconds.
	 */
	duration: number;
	/**
	 * How long the playback of the recording should be delayed, in seconds.
	 */
	playbackDelay: number;
	hasMicAccess: boolean;
};

function AudioRecorderComponent({
	recordingDelay,
	duration,
	playbackDelay,
	hasMicAccess,
}: AudioRecorderComponentProps) {
	const channel = useRef<Channel>(new Channel());
	const inputChannel = useRef<Channel>(new Channel());
	const recorder = useRef<Recorder>(new Recorder());
	const [recording, setRecording] = useState(false);
	const [willStartRecording, setWillStartRecording] = useState<Boolean>(false);

	const timerRef = useRef<any>();

	useEffect(() => {
		inputChannel.current.receive(inputs.audioIn);
		inputChannel.current.connect(recorder.current);

		channel.current.send(outputs.channel1, 0);
		channel.current.volume.rampTo(0, 0.1);
		return () => {
			console.log("Component unmounted, cleanup?", channel.current);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			channel.current.volume.rampTo(-Infinity, 0.1);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			if (recording) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				recorder.current.stop();
			}
			clearTimeout(timerRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleFinishedRecording() {
		recorder.current.stop().then((recording) => {
			const url = URL.createObjectURL(recording);
			console.log("Recording finished, url is: ", url);
			const newBuffer = new Buffer({
				url: url,
				onload: (loadedBuffer) => {
					console.log("loaded buffer");
					const normalizedBuffer = normalize(newBuffer);
					console.log("normalized buffer: ", normalizedBuffer);
					const player = new Player({
						url: normalizedBuffer,
						loop: false,
						onload: () => {
							console.log("buffer loaded");
						},
						onstop: () => {
							player.dispose();
						},
					});
					player.start(playbackDelay);
					player.connect(channel.current);
				},
			});
		});
		setRecording(false);
	}

	return (
		<div
			className="upper-content audio-recorder"
			onClick={async () => {
				if (!recording) {
					setWillStartRecording(true);
					timerRef.current = setTimeout(() => {
						console.log("Recording started");
						recorder.current.start();
						setRecording(true);
						setWillStartRecording(false);
						if (duration) {
							console.log(
								`Duration exists, will stop recording in ${duration}`
							);
							timerRef.current = setTimeout(() => {
								console.log(`Duration ended, handles finished recording`);
								handleFinishedRecording();
							}, duration * 1000);
						}
					}, recordingDelay * 1000);
				} else {
					clearTimeout(timerRef.current);
					console.log(`Recording manually stopped, handles finished recording`);
					setWillStartRecording(false);
					handleFinishedRecording();
				}
			}}
		>
			<div>
				{recording
					? "Recording"
					: willStartRecording
					? "Will start recording"
					: "Click to start recording"}
			</div>
			<div>{hasMicAccess ? "" : <div>NO MICROPHONE ACCESS</div>}</div>
		</div>
	);
}

export default AudioRecorderComponent;
