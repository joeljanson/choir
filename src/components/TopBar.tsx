// import React, { useEffect } from "react";
import "../css/TopBar.scss";

type TopBarProps = {
	name: string;
	part: string;
	// currentPage: number;
	// setCurrentPage: (newCurrentPage: number) => void;
	// totalCount: number;
};

function TopBar({ name, part }: TopBarProps) {
	return (
		<div className="top-bar-wrapper">
			<div>*****</div>
			<div>{name}</div>
			<div>{part}</div>
		</div>
	);
}

export default TopBar;
