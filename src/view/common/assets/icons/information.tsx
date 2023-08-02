import * as React from 'react';

type InformationIconProps = {
	color: string;
	width?: number;
	height?: number;
};

const InformationIcon = ({
	color,
	width = 20,
	height = 20,
	...rest
}: InformationIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		fill="none"
		{...rest}
	>
		<path
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.6}
			d="M10 13.335V10m0-3.333h.008m8.325 3.333a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0Z"
		/>
	</svg>
);
export default InformationIcon;
