import React, { useEffect, useState } from "react";
import { ToneAudioBuffers, start } from "tone";
import "../../css/IntroComponent.scss";
import json from "../Decay/Fragments.json";

//import image from "../assets/image.jpg";
//import image from "https://i.pinimg.com/474x/89/13/99/891399ca3ea670fab895d9a8a4ee4257.jpg";

interface Audio {
	trigger: string;
	audioPath: string;
}

interface Place {
	audio: Audio[];
}

interface Voice {
	[place: string]: Place;
}

interface VoiceJson {
	[voice: string]: Voice;
}

export type IntroComponentProps = {
	onLoaded: (
		buffers: ToneAudioBuffers,
		partAndPlace: { partName: string; place: string }
	) => void;
	pieceName: string;
	partName: string;
	/* buffersToLoad: Array<string>; */
};

function IntroComponent({
	onLoaded,
	pieceName,
	partName,
}: /* buffersToLoad, */
IntroComponentProps) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [buffers, setBuffers] = useState<ToneAudioBuffers | null>(null);

	const getRandomPlace = (voiceData: Voice): [string, Place] => {
		const places = Object.keys(voiceData);
		const randomIndex = Math.floor(Math.random() * places.length);
		const placeName = places[randomIndex];
		const placeData = voiceData[placeName];
		return [placeName, placeData];
	};

	useEffect(() => {
		const jsonData = json as VoiceJson;

		if (jsonData[partName.toLocaleLowerCase()]) {
			const [placeName, placeData] = getRandomPlace(
				jsonData[partName.toLowerCase()]
			);
			console.log("Place name:", placeName);
			console.log("Audio:", placeData.audio);

			const { audio } = placeData;

			const bufferMap = audio.reduce((acc, audioObj) => {
				acc[audioObj.trigger] = audioObj.audioPath;
				return acc;
			}, {} as { [key: string]: string });

			const loadedBuffers = new ToneAudioBuffers({
				urls: bufferMap,
				onload: () => {
					setBuffers(loadedBuffers);
					setLoaded(true);
					onLoaded(loadedBuffers, {
						partName: partName,
						place: placeName,
					});
				},
				onerror: (err) => {
					console.log(err);
					setError(true);
				},
				baseUrl: process.env.PUBLIC_URL + "/audio/",
			});
		} else {
			console.log("The voice is probably missing in the json-file.");
		}
		return () => {};
	}, []);

	return (
		<React.Fragment>
			<div className="intro-wrapper">
				<div className="intro-content-wrapper">
					<div className="intro-content-text-area">
						<div className="text-content">
							<h1>{pieceName}</h1>
							<div className="intro">
								{loaded
									? "Press anywhere to be able to start the piece."
									: error
									? "There was an error loading the audio files.."
									: "Loading..."}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default IntroComponent;
