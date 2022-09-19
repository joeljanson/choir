import "../css/Pagination.scss";

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
				<h1>Previous</h1>
			</div>
			<div className="current-page">{currentPage + 1}</div>
			<div onClick={onNext} className="pagination-button">
				<h1>Next</h1>
			</div>
		</div>
	);
}

export default Pagination;
