import type {IconType} from '@/view/common/types/icon';
import React from 'react';

export const CancelIcon = ({
	stroke = '#9E9E9E',
	width = 10,
	height = 10,
	onClick,
	className,
}: IconType) => (
	<svg
		onClick={onClick}
		className={className}
		width={width}
		height={height}
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M11 1L1 11M1 1L11 11"
			stroke={stroke}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default CancelIcon;
