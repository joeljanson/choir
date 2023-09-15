import { ToneAudioBuffer } from "tone";
import AudioRecorderComponent from "./AudioRecorderComponent";
import CanvasComponent from "./CanvasComponent";
//import PlayerComponent from "./PlayerComponent";
import BaseComponent from "./BaseComponent";
import ScrollTrackingDiv from "./ScrollTrackingComponent";

type PagerViewProps = {
	currentPage: number;
	buffers: ToneAudioBuffer[];
	hasMicAccess: boolean;
};

function PagerView({ currentPage, buffers, hasMicAccess }: PagerViewProps) {
	console.log("PAGER VIEW", buffers);
	switch (currentPage) {
		case 0:
			return (
				<div>
					<BaseComponent
						components={[
							// <PlayerComponent key="1" buffer={buffers[0]} />,
							// <PlayerComponent key="1" buffer={buffers[1]} />,
							// <CanvasComponent />,
							//<ScrollSpeed></ScrollSpeed>,
							<ScrollTrackingDiv></ScrollTrackingDiv>,
						]}
						upperComponentHeight="66%"
					></BaseComponent>
					<button style={{ flexGrow: 1 }}>HEJ!</button>
				</div>
			);
		case 1:
			return (
				<BaseComponent
					components={<CanvasComponent />}
					upperComponentHeight="100%"
				></BaseComponent>
			);
		case 2:
			return (
				<BaseComponent
					components={<CanvasComponent />}
					upperComponentHeight="100%"
				></BaseComponent>
			);
		case 3:
			return (
				<BaseComponent
					components={
						<AudioRecorderComponent
							duration={30}
							recordingDelay={0}
							playbackDelay={0}
							hasMicAccess={hasMicAccess}
						/>
					}
					upperComponentHeight="100%"
				></BaseComponent>
			);
		case 4:
			return (
				<BaseComponent
					components={<CanvasComponent />}
					upperComponentHeight="100%"
				></BaseComponent>
			);
		default:
			return <div>Sidan finns ej</div>;
	}
}

export default PagerView;
