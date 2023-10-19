//Import external libraries
import React, { useEffect, useState } from "react";
import { Player, ToneAudioBuffers, Transport, Volume, start } from "tone";
import IntroComponent from "../Main components/IntroComponent";
import MainContent from "../Main components/MainContent";
import "../../css/Decay.scss";
import { Console } from "console";

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
	const [partAndPlace, setPartAndPlace] = useState<{
		partName: string;
		place: string;
	}>();

	useEffect(() => {}, [currentPage]);

	const onLoaded = (
		loadedBuffers: ToneAudioBuffers,
		partAndPlace: { partName: string; place: string }
	) => {
		setBuffers(loadedBuffers);
		setPartAndPlace(partAndPlace);
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
		console.log(
			"Here -> Start the transport and make a volume fade up to 0db during 1 minute 20 seconds. The audio file should be two minutes long.",
			"The first minute should be faint noises - connected to the environment that is being read about.",
			"The next 40 seconds should contain the full on environment, fading in over 20s (as a 30s loop  to save mb?)",
			"So after 2 minutes approximately, the 'aaaaaah' recording appears to give a note.",
			"During the next 30 seconds, the conductor starts conducting and altos join in the 'aaaaaah'",
			"At 2 minutes 45 seconds, everyone starts. and the audio from the speakers disappear during 15s while the choir is singing tutti, except for the aaaahs"
		);
		console.log("Click!");
		await start();
		setStarted(true);
		// Setup volume control
		const volume = new Volume(-Infinity).toDestination();
		const atmosExtraVolume = new Volume(-Infinity).toDestination();
		const ahVolume = new Volume(-Infinity).toDestination();

		//Setup the players
		const ahplayer = new Player(buffers?.get("ahs")).connect(ahVolume);
		ahplayer.loop = true;
		ahplayer.fadeIn = 5;
		const atmosPlayer = new Player(buffers?.get("atmos")).connect(volume);
		atmosPlayer.loop = true;
		const atmosExtraPlayer = new Player(buffers?.get("atmos-extra")).connect(
			atmosExtraVolume
		);
		atmosExtraPlayer.loop = true;

		//setup the timing queues of the players
		const atmosQueue = 45;
		const atmosExtraQueue = atmosQueue + 10;
		const ahPlayerQueue = atmosQueue + (10 + Math.random() * 20);

		const stopTime = 120;
		if (stopTime > ahPlayerQueue) {
			console.warn("Warning! The ahplayer queue is later than the stop time!");
		}

		//Queue the players
		ahplayer.start("+" + ahPlayerQueue);
		atmosPlayer.start("+" + atmosQueue);
		atmosExtraPlayer.start("+" + atmosExtraQueue);

		//Queue the volume fades
		ahVolume.volume.linearRampTo(
			0,
			30 + Math.random() * 15,
			"+" + ahPlayerQueue
		);
		volume.volume.linearRampTo(0, 10 + Math.random() * 15, "+" + atmosQueue);
		atmosExtraVolume.volume.linearRampTo(
			0,
			10 + Math.random() * 15,
			"+" + atmosExtraQueue
		);

		//Stop the players after exactly 120 seconds (now)
		//should actually fade out the atmos players!
		ahplayer.stop("+" + stopTime);
		atmosPlayer.stop("+" + stopTime);
		atmosExtraPlayer.stop("+" + stopTime);
		ahVolume.volume.linearRampTo(-Infinity, 15, "+" + (stopTime - 15));
		volume.volume.linearRampTo(-Infinity, 15, "+" + (stopTime - 15));
	};

	if (loaded) {
		if (started) {
			return (
				<MainContent
					currentPage={currentPage}
					buffers={buffers!}
					partName={partAndPlace?.partName ?? "Unset partname"}
					place={partAndPlace?.place ?? "Unset place"}
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
				partName={partName}
			></IntroComponent>
		);
	}
}

export default Decay;
