//Components
import Pagination from "./Pagination";

//CSS
import "../css/MainContent.scss";
import PagerView from "./PagerViewComponent";
import { ToneAudioBuffer } from "tone";

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
