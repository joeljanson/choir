import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/SelectPart.scss";

// Define the component
const SelectPart: React.FC = () => {
	// Initialize the useHistory hook
	const navigate = useNavigate();

	// Function to handle button click
	const handleButtonClick = (part: string) => {
		// Redirect to baseUrl + part name in lowercase
		navigate(`/${part.toLowerCase()}`);
	};

	return (
		<div className="part-wrapper">
			<h1>Select your part</h1>
			<button onClick={() => handleButtonClick("Soprano")}>Soprano</button>
			<button onClick={() => handleButtonClick("Alto")}>Alto</button>
			<button onClick={() => handleButtonClick("Tenor")}>Tenor</button>
			<button onClick={() => handleButtonClick("Bass")}>Bass</button>
		</div>
	);
};

export default SelectPart;
