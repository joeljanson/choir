import React, { useRef } from "react";
import { Channel, UserMedia, start } from "tone";
import "../css/IntroComponent.scss";

//import image from "../assets/image.jpg";
//import image from "https://i.pinimg.com/474x/89/13/99/891399ca3ea670fab895d9a8a4ee4257.jpg";

export type IntroComponentProps = {
	onToneStarted: () => void;
	onMicAccess: () => void;
	hasMicAccess: boolean;
	wantsMicAccess: boolean;
	toneStarted: boolean;
	pieceName: string;
};

function IntroComponent({
	onMicAccess,
	onToneStarted,
	wantsMicAccess,
	pieceName,
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
						src="https://images.unsplash.com/photo-1570450483095-80261f758e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2957&q=80"
					></img>
					<div className="intro-content-text-area">
						<div className="text-content">
							<h1>{pieceName}</h1>
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
