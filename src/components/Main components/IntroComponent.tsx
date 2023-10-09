import React, { useEffect, useState } from "react";
import { ToneAudioBuffers, start } from "tone";
import "../../css/IntroComponent.scss";

//import image from "../assets/image.jpg";
//import image from "https://i.pinimg.com/474x/89/13/99/891399ca3ea670fab895d9a8a4ee4257.jpg";

export type IntroComponentProps = {
	onLoaded: (buffers: ToneAudioBuffers) => void;
	pieceName: string;
	buffersToLoad: Array<string>;
};

function IntroComponent({
	onLoaded,
	pieceName,
	buffersToLoad,
}: IntroComponentProps) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [buffers, setBuffers] = useState<ToneAudioBuffers | null>(null);

	useEffect(() => {
		const bufferMap = buffersToLoad.reduce((acc, url, index) => {
			acc[index] = url;
			return acc;
		}, {} as { [key: string]: string });
		const loadedBuffers = new ToneAudioBuffers({
			urls: bufferMap,
			onload: () => {
				setBuffers(loadedBuffers);
				setLoaded(true);
				onLoaded(loadedBuffers);
			},
			onerror: (err) => {
				console.log(err);
				setError(true);
			},
			baseUrl: process.env.PUBLIC_URL + "/audio/",
		});
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
