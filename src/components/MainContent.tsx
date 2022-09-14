import { ToneAudioBuffer } from "tone";
import "../css/MainContent.scss";
import AudioRecorderComponent from "./AudioRecorderComponent";

import Pagination from "./Pagination";
import TextMessageAudioComponent from "./TextMessageAudioComponent";

type PagerViewProps = {
	currentPage: number;
	buffers: ToneAudioBuffer[];
};

const PagerView = ({ currentPage, buffers }: PagerViewProps) => {
	console.log("PAGER VIEW", buffers);
	switch (currentPage) {
		case 0:
			return <div> hej 0</div>;
		case 1:
			return <TextMessageAudioComponent buffers={buffers} />;
		case 2:
			return (
				<AudioRecorderComponent
					duration={4}
					recordingDelay={0}
					playbackDelay={0}
				/>
			);
		default:
			return <div>Sidan finns ej</div>;
	}
};

type MainContentProps = {
	currentPage: number;
	buffers: ToneAudioBuffer[];
	setCurrentPage: (page: number) => void;
	totalCount: number;
};

function MainContent({
	currentPage,
	buffers,
	setCurrentPage,
	totalCount,
}: MainContentProps) {
	return (
		<div className="main-content-wrapper">
			<div className="upper-content-wrapper">
				<PagerView buffers={buffers} currentPage={currentPage} />
			</div>
			<Pagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalCount={totalCount}
			/>
		</div>
	);
}

export default MainContent;
