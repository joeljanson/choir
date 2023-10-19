// componentMapping.tsx
import React, { ReactElement } from "react";
import SopranoVegas from "./voices/soprano/SopranoVegas";
import SopranoNiagara from "./voices/soprano/SopranoNiagara";
import SopranoNewyork from "./voices/soprano/SopranoNewyork";
import SopranoSanfransisco from "./voices/soprano/SopranoSanfransisco";
// ... import other components

type ComponentMappingType = {
	[key: string]: React.ElementType;
};

const capitalizeFirstLetter = (string: string): string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const componentMapping: ComponentMappingType = {
	SopranoVegas,
	SopranoNiagara,
	SopranoNewyork,
	SopranoSanfransisco,
	/* TenorNiagara, */
	// ... add other components
};

export const getComponent = (
	voice: string,
	place: string
): ReactElement | null => {
	const capitalizedVoice = capitalizeFirstLetter(voice);
	const capitalizedPlace = capitalizeFirstLetter(place);
	const componentName = `${capitalizedVoice}${capitalizedPlace}`;

	const Component = componentMapping[componentName];

	if (!Component) return null;

	return React.createElement(Component);
};
