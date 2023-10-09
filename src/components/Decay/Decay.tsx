//Import external libraries
import React, { useEffect, useState } from "react";
import { ToneAudioBuffers, start } from "tone";
import IntroComponent from "../Main components/IntroComponent";
import MainContent from "../Main components/MainContent";
import "../../css/Decay.scss";

//Components
//import IntroComponent from "../Main components/IntroComponent";
//import MainContent from "../Main components/MainContent";

export type PartComponentProps = {
	partName: string;
};

function Decay({ partName }: PartComponentProps) {
	const [loaded, setLoaded] = useState(false);
	const [started, setStarted] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [buffers, setBuffers] = useState<ToneAudioBuffers | null>(null);

	useEffect(() => {}, [currentPage]);

	const onLoaded = (loadedBuffers: ToneAudioBuffers) => {
		setBuffers(loadedBuffers);
		setLoaded(true);
		console.log("Loaded buffers are: ", loadedBuffers);
		//const player = new Player(loadedBuffers.get("0")).toDestination().start();
		/* const playerTwo = new Player(loadedBuffers.get("1"))
			.toDestination()
			.start(); */
	};

	const onSetCurrentPage = (page: number) => {
		setCurrentPage(page);
	};

	const handleClick = async () => {
		console.log("Click!");
		await start();
		setStarted(true);
	};

	if (loaded) {
		if (started) {
			return (
				<MainContent
					currentPage={currentPage}
					buffers={buffers!}
					setCurrentPage={onSetCurrentPage}
					totalCount={5}
					hasMicAccess={false}
					part={partName}
				></MainContent>
			);
		} else {
			return (
				<div className="decay-content-wrapper">
					<div className="content">
						<h1>All set and ready to go</h1>
						<p>
							Once you are ready, wait for the conductor to sign and then press
							the button below.
						</p>
						<button onClick={() => handleClick()}>Start piece</button>
					</div>
				</div>
			);
		}
	} else {
		return (
			<IntroComponent
				onLoaded={onLoaded}
				pieceName={"Loading " + partName + " part"}
				buffersToLoad={["Adagio.wav"]}
			></IntroComponent>
		);
	}
}

export default Decay;
