//Components
import Pagination from "../Pagination";

//CSS
import "../../css/MainContent.scss";
import PagerView from "../PagerViewComponent";
import { ToneAudioBuffers } from "tone";
import TopBar from "../TopBar";
import SimpleText from "../Subcomponents/SimpleText";
import { useState } from "react";

type MainContentProps = {
	currentPage: number;
	buffers: ToneAudioBuffers;
	setCurrentPage: (page: number) => void;
	totalCount: number;
	hasMicAccess: boolean;
	part: string;
};

function MainContent({
	currentPage,
	buffers,
	setCurrentPage,
	totalCount,
	hasMicAccess,
	part,
}: MainContentProps) {
	const [internalCurrentPage, setInternalCurrentPage] = useState(0);
	const onSetCurrentPage = (page: number) => {
		console.log("Setting the current page!");
		setCurrentPage(page);
		//setInternalCurrentPage(page);
	};

	return (
		<div className="main-content-wrapper">
			<TopBar name="DECAY" part={part}></TopBar>
			<div className="upper-content-wrapper">
				<PagerView
					currentPage={currentPage}
					hasMicAccess={hasMicAccess}
					buffers={buffers}
				/>
			</div>
			<Pagination
				currentPage={currentPage}
				setCurrentPage={onSetCurrentPage}
				totalCount={totalCount}
			/>
		</div>
	);
}

export default MainContent;
