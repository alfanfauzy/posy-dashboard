import type {IconType} from '@/view/common/types/icon';
import React from 'react';

export const NoOrderIcon = ({
	fill = '#E0E0E0',
	width = 167,
	height = 73,
	onClick,
	className,
}: IconType) => (
	<svg
		onClick={onClick}
		className={className}
		width={width}
		height={height}
		viewBox="0 0 167 73"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M17.0566 62.6892L46.0495 48.5481L75.6281 39.71L166.999 47.3697C152.552 54.1456 120.728 68.7581 109.014 73.0004C84.6481 72.529 37.5566 65.9299 17.0566 62.6892Z"
			fill={fill}
		/>
		<path
			d="M159.093 20.6392C112.236 17.1444 83.5357 9.47511 63.6214 2C49.2714 9.96051 17.0571 27.9202 3 36.0749C43.2971 66.1306 89.2952 70.3439 107.257 68.6935C120.924 56.2674 150.424 29.2599 159.093 20.6392Z"
			fill="white"
			stroke="#C2C2C2"
			strokeWidth="2.35714"
		/>
		<path
			d="M36.6777 30.8715L60.1063 16.7305"
			stroke="#C2C2C2"
			strokeWidth="2.35714"
			strokeLinecap="round"
		/>
		<path
			d="M48.9785 31.7556L62.157 23.5066M43.707 48.5481L89.3927 19.6768M58.057 52.378L103.743 23.5066M72.1142 56.7971L117.8 27.9257"
			stroke="#C2C2C2"
			strokeWidth="0.785714"
			strokeLinecap="round"
		/>
	</svg>
);

export default NoOrderIcon;
