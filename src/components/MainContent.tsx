//Components
import Pagination from "./Pagination";

//CSS
import "../css/MainContent.scss";
import PagerView from "./PagerViewComponent";
import { ToneAudioBuffer } from "tone";
import TopBar from "./TopBar";

type MainContentProps = {
	currentPage: number;
	buffers: ToneAudioBuffer[];
	setCurrentPage: (page: number) => void;
	totalCount: number;
	hasMicAccess: boolean;
};

function MainContent({
	currentPage,
	buffers,
	setCurrentPage,
	totalCount,
	hasMicAccess,
}: MainContentProps) {
	return (
		<div className="main-content-wrapper">
			<TopBar name="DECAY"></TopBar>
			<div className="upper-content-wrapper">
				<PagerView
					buffers={buffers}
					currentPage={currentPage}
					hasMicAccess={hasMicAccess}
				/>
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
