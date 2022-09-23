import { ToneAudioBuffer } from "tone";
import AudioRecorderComponent from "./AudioRecorderComponent";
import CanvasComponent from "./CanvasComponent";
import PlayerComponent from "./PlayerComponent";

type PagerViewProps = {
	currentPage: number;
	buffers: ToneAudioBuffer[];
	hasMicAccess: boolean;
};

function PagerView({ currentPage, buffers, hasMicAccess }: PagerViewProps) {
	console.log("PAGER VIEW", buffers);
	switch (currentPage) {
		case 0:
			return <PlayerComponent key="1" buffer={buffers[0]} />;
		case 1:
			return <PlayerComponent key="2" buffer={buffers[1]} />;
		case 2:
			return <CanvasComponent />;
		case 4:
			return <CanvasComponent />;
		case 3:
			return (
				<AudioRecorderComponent
					duration={4}
					recordingDelay={0}
					playbackDelay={0}
					hasMicAccess={hasMicAccess}
				/>
			);
		default:
			return <div>Sidan finns ej</div>;
	}
}

export default PagerView;
