import { ToneAudioBuffers } from "tone";
import AudioRecorderComponent from "./Subcomponents/AudioRecorderComponent";
import CanvasComponent from "./Subcomponents/CanvasComponent";
import PlayerComponent from "./Subcomponents/PlayerComponent";
import BaseComponent from "./Subcomponents/BaseComponent";
import SimpleText from "./Subcomponents/SimpleText";
//import ScrollTrackingDiv from "./Subcomponents/ScrollTrackingComponent";

type PagerViewProps = {
	currentPage: number;
	buffers: ToneAudioBuffers;
	narrativeForPartOne: string;
	hasMicAccess: boolean;
};

function PagerView({
	currentPage,
	buffers,
	narrativeForPartOne,
	hasMicAccess,
}: PagerViewProps) {
	console.log("PAGER VIEW", buffers);
	switch (currentPage) {
		case 0:
			return (
				<div>
					<BaseComponent
						components={[
							<SimpleText
								buffers={buffers}
								narrativeForPartOne={narrativeForPartOne}
							/>,
							//<PlayerComponent key="1" buffer={buffers.get("0")} />,
							// <PlayerComponent key="1" buffer={buffers[1]} />,
							// <CanvasComponent />,
							//<ScrollSpeed></ScrollSpeed>,
							//<ScrollTrackingDiv></ScrollTrackingDiv>,
						]}
						upperComponentHeight="66%"
					></BaseComponent>
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
