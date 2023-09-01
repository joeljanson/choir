// import React, { useEffect } from "react";
import "../css/Pagination.scss";
import ArrowSvg from "../assets/navigation_arrow_left.svg"; // Adjust the path

type PaginationProps = {
	currentPage: number;
	setCurrentPage: (newCurrentPage: number) => void;
	totalCount: number;
};

function Pagination({
	currentPage,
	setCurrentPage,
	totalCount,
}: PaginationProps) {
	const onNext = () => {
		if (currentPage === totalCount - 1) return;
		setCurrentPage(currentPage + 1);
	};

	const onPrevious = () => {
		if (currentPage < 1) return;
		setCurrentPage(currentPage - 1);
	};

	return (
		<div className="pagination-wrapper">
			<div onClick={onPrevious} className="pagination-button">
				<img
					src={ArrowSvg}
					alt="Previous"
					className={`pagination-arrow ${currentPage > 0 ? "visible" : ""}`}
				/>
			</div>
			<div className="current-page">{currentPage + 1}</div>
			<div onClick={onNext} className="pagination-button">
				<img
					src={ArrowSvg}
					alt="Next"
					className={`rotated-arrow pagination-arrow ${
						currentPage < totalCount - 1 ? "visible" : ""
					}`}
				/>
			</div>
		</div>
	);
}

export default Pagination;
