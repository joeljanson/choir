//Import external libraries
import React, { useRef, useEffect, useState } from "react";
import { Buffer, ToneAudioBuffer } from "tone";

//Components
import IntroComponent from "./components/IntroComponent";
import MainContent from "./components/MainContent";

//Load CSS
import "./App.scss";

// Setup audio mixer
import { Audio } from "./utils/Audio";

// Load audio files
const piano = require("./audio/a1.mp3");

function App() {
	const [buffers, setBuffers] = useState<ToneAudioBuffer[]>([]);
	const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState(false);
	const [wantsMicrophoneAccess] = useState(false);
	const [toneStarted, setToneStarted] = useState(false);
	const [buffersLoaded, setBuffersLoaded] = useState(false);

	const [currentPage, setCurrentPage] = useState(0);

	useRef(new Audio());

	useEffect(
		() => {
			new Buffer({
				url: piano,
				onload: (loadedBuffer) => {
					console.log("audio loaded");
					if (!loadedBuffer) return;
					setBuffers((buffers) => [loadedBuffer, ...buffers]);
					setBuffersLoaded(true);
				},
			});
		},
		[
			/* dependency array (läs på)*/
		]
	);

	// useEffect(()=>{
	// },[currentPage])
	const onMicAccess = () => {
		setHasMicrophoneAccess(true);
	};

	const onToneStarted = () => {
		setToneStarted(true);
	};

	const onSetCurrentPage = (page: number) => {
		setCurrentPage(page);
	};

	if (
		(wantsMicrophoneAccess && hasMicrophoneAccess && buffersLoaded) ||
		(!wantsMicrophoneAccess && toneStarted && buffersLoaded)
	)
		return (
			<MainContent
				currentPage={currentPage}
				setCurrentPage={onSetCurrentPage}
				buffers={buffers}
				totalCount={3}
			></MainContent>
		);
	return (
		<IntroComponent
			wantsMicAccess={wantsMicrophoneAccess}
			hasMicAccess={hasMicrophoneAccess}
			onMicAccess={onMicAccess}
			onToneStarted={onToneStarted}
			toneStarted={toneStarted}
		/>
	);
}

export default App;
