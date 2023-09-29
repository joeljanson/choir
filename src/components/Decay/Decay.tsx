//Import external libraries
import React, { useEffect, useState } from "react";
import { Buffer, ToneAudioBuffer } from "tone";

//Components
import IntroComponent from "../IntroComponent";
import MainContent from "../MainContent";

// Setup audio mixer
import { Audio } from "../../utils/Audio";

// Load audio files
import { piano, keyboardClick } from "../../utils/AudioFiles";

export type ComponentBuffer = {
	bufferUrl: ToneAudioBuffer;
	playlistBehaviour: "auto" | "none";
	name: string;
};

function Decay() {
	const [buffers, setBuffers] = useState<ToneAudioBuffer[]>([]);
	const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState(false);
	const [wantsMicrophoneAccess] = useState(false);
	const [toneStarted, setToneStarted] = useState(false);
	const [buffersLoaded, setBuffersLoaded] = useState(false);

	const [currentPage, setCurrentPage] = useState(0);

	useEffect(
		() => {
			new Audio();
			loadBuffer(piano);
			loadBuffer(keyboardClick);
		},
		[
			/* dependency array (läs på)*/
		]
	);

	const loadBuffer = (bufferUrl: any) => {
		new Buffer({
			url: bufferUrl,
			onload: (loadedBuffer) => {
				console.log("audio loaded");
				if (!loadedBuffer) return;
				setBuffers((buffers) => [loadedBuffer, ...buffers]);
				setBuffersLoaded(true);
			},
		});
	};

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
				totalCount={5}
				hasMicAccess={hasMicrophoneAccess}
			></MainContent>
		);
	return (
		<IntroComponent
			wantsMicAccess={wantsMicrophoneAccess}
			hasMicAccess={hasMicrophoneAccess}
			onMicAccess={onMicAccess}
			onToneStarted={onToneStarted}
			toneStarted={toneStarted}
			pieceName="Programblad"
		/>
	);
}

export default Decay;
