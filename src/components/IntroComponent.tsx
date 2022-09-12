import React, { useRef } from "react";
import { Channel, UserMedia, start } from "tone";
import "../css/IntroComponent.css";

export type IntroComponentProps = {
	onToneStarted: () => void;
	onMicAccess: () => void;
	hasMicAccess: boolean;
	wantsMicAccess: boolean;
	toneStarted: boolean;
};

function IntroComponent({
	onMicAccess,
	onToneStarted,
	wantsMicAccess,
}: IntroComponentProps) {
	const mic = useRef<UserMedia>(new UserMedia());
	const channel = useRef<Channel>(new Channel());

	return (
		<React.Fragment>
			<div
				onClick={async () => {
					await start();
					console.log("Tone started");
					onToneStarted();
					if (!wantsMicAccess) return;

					mic.current
						.open()
						.then(() => {
							console.log("mic open");
							channel.current.send("audio-in");
							mic.current.connect(channel.current);
							onMicAccess();
						})
						.catch((e) => {
							// promise is rejected when the user doesn't have or allow mic access
							console.log("mic not open");
						});
				}}
				className="intro-wrapper"
			>
				<div className="intro-content-wrapper">
					<img
						alt="From unsplash"
						src="https://images.unsplash.com/photo-1657828513890-8617428e2214?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
					></img>
					<div className="intro-content-text-area">
						<div className="text-content">
							<h1>Accept things</h1>
							<div className="intro">
								Press anywhere to be able to start the piece.
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default IntroComponent;
