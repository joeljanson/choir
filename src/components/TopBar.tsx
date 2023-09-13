// import React, { useEffect } from "react";
import "../css/TopBar.scss";

type TopBarProps = {
	name: string;
	// currentPage: number;
	// setCurrentPage: (newCurrentPage: number) => void;
	// totalCount: number;
};

function TopBar({ name }: TopBarProps) {
	return (
		<div className="top-bar-wrapper">
			<div>Section-dummy</div>
			<div>{name}</div>
			<div>Voice/Part</div>
		</div>
	);
}

export default TopBar;
