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
	narrativeForPartOne: string;
	setCurrentPage: (page: number) => void;
	totalCount: number;
	hasMicAccess: boolean;
	part: string;
};

function MainContent({
	currentPage,
	buffers,
	narrativeForPartOne,
	setCurrentPage,
	totalCount,
	hasMicAccess,
	part,
}: MainContentProps) {
	const onSetCurrentPage = (page: number) => {
		console.log("Setting the current page!");
		setCurrentPage(page);
		//setInternalCurrentPage(page);
	};

	return (
		<div className="main-content-wrapper">
			<TopBar name="DETACH" part={part}></TopBar>
			<div className="upper-content-wrapper">
				<PagerView
					currentPage={currentPage}
					hasMicAccess={hasMicAccess}
					buffers={buffers}
					narrativeForPartOne={narrativeForPartOne}
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
