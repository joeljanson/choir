import React, { ReactNode } from "react";
import "../css/BaseComponent.scss";

interface BaseComponentProps {
	components?: ReactNode | ReactNode[]; // Accept a single component or an array of components
	upperComponentHeight: string; // Specify the height of the upper component (e.g., '75%')
}

function BaseComponent({
	components,
	upperComponentHeight = "50%",
}: BaseComponentProps) {
	const componentArray = Array.isArray(components) ? components : [components];

	return (
		<div className="component-wrapper">
			{componentArray?.map((component, index) => (
				<div
					className={`shared-component`}
					style={
						index + 1 === 0
							? { flex: `0 0 ${upperComponentHeight}` }
							: undefined
					}
					key={index}
				>
					{component}
				</div>
			))}
		</div>
	);
}

export default BaseComponent;
