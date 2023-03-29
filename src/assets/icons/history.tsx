import type {IconType} from '@/types/icon';
import React from 'react';

export const HistoryIcon = ({
	fill = '#424242',
	width = 22,
	height = 22,
	onClick,
	className,
}: IconType) => (
	<svg
		onClick={onClick}
		className={className}
		width={width}
		height={height}
		viewBox="0 0 22 22"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M11 5V11L15 13M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
			stroke={fill}
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default HistoryIcon;
