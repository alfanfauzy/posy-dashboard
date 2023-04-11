import type {IconType} from '@/view/common/types/icon';
import React from 'react';

export const ProductIcon = ({
	fill = '#424242',
	width = 18,
	height = 22,
	onClick,
	className,
}: IconType) => (
	<svg
		onClick={onClick}
		className={className}
		width={width}
		height={height}
		viewBox="0 0 18 22"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15.5475 0.5H2.4525C2.00097 0.5 1.56793 0.67937 1.24865 0.998651C0.92937 1.31793 0.75 1.75097 0.75 2.2025V19.7975C0.75 20.249 0.92937 20.6821 1.24865 21.0014C1.56793 21.3206 2.00097 21.5 2.4525 21.5H9C9.19891 21.5 9.38968 21.421 9.53033 21.2803C9.67098 21.1397 9.75 20.9489 9.75 20.75V4.25C9.75 4.05109 9.67098 3.86032 9.53033 3.71967C9.38968 3.57902 9.19891 3.5 9 3.5C8.80109 3.5 8.61032 3.57902 8.46967 3.71967C8.32902 3.86032 8.25 4.05109 8.25 4.25V20H2.4525C2.39879 20 2.34729 19.9787 2.30931 19.9407C2.27133 19.9027 2.25 19.8512 2.25 19.7975V2.2025C2.25 2.14879 2.27133 2.09729 2.30931 2.05931C2.34729 2.02133 2.39879 2 2.4525 2H15.5475C15.6012 2 15.6527 2.02133 15.6907 2.05931C15.7287 2.09729 15.75 2.14879 15.75 2.2025V19.7975C15.75 19.8512 15.7287 19.9027 15.6907 19.9407C15.6527 19.9787 15.6012 20 15.5475 20H12C11.8011 20 11.6103 20.079 11.4697 20.2197C11.329 20.3603 11.25 20.5511 11.25 20.75C11.25 20.9489 11.329 21.1397 11.4697 21.2803C11.6103 21.421 11.8011 21.5 12 21.5H15.5475C15.999 21.5 16.4321 21.3206 16.7514 21.0014C17.0706 20.6821 17.25 20.249 17.25 19.7975V2.2025C17.25 1.75097 17.0706 1.31793 16.7514 0.998651C16.4321 0.67937 15.999 0.5 15.5475 0.5Z"
			fill={fill}
		/>
		<path
			d="M12.75 18.5H14.25C14.4489 18.5 14.6397 18.421 14.7803 18.2803C14.921 18.1397 15 17.9489 15 17.75C15 17.5511 14.921 17.3603 14.7803 17.2197C14.6397 17.079 14.4489 17 14.25 17H12.75C12.5511 17 12.3603 17.079 12.2197 17.2197C12.079 17.3603 12 17.5511 12 17.75C12 17.9489 12.079 18.1397 12.2197 18.2803C12.3603 18.421 12.5511 18.5 12.75 18.5Z"
			fill={fill}
		/>
		<path
			d="M12.75 16.25H14.25C14.4489 16.25 14.6397 16.171 14.7803 16.0303C14.921 15.8897 15 15.6989 15 15.5C15 15.3011 14.921 15.1103 14.7803 14.9697C14.6397 14.829 14.4489 14.75 14.25 14.75H12.75C12.5511 14.75 12.3603 14.829 12.2197 14.9697C12.079 15.1103 12 15.3011 12 15.5C12 15.6989 12.079 15.8897 12.2197 16.0303C12.3603 16.171 12.5511 16.25 12.75 16.25Z"
			fill={fill}
		/>
		<path
			d="M7.5 3.5C7.5 3.30109 7.42098 3.11032 7.28033 2.96967C7.13968 2.82902 6.94891 2.75 6.75 2.75H3.75C3.55109 2.75 3.36032 2.82902 3.21967 2.96967C3.07902 3.11032 3 3.30109 3 3.5V6.5C3 6.69891 3.07902 6.88968 3.21967 7.03033C3.36032 7.17098 3.55109 7.25 3.75 7.25H6.75C6.94891 7.25 7.13968 7.17098 7.28033 7.03033C7.42098 6.88968 7.5 6.69891 7.5 6.5V3.5ZM6 5.75H4.5V4.25H6V5.75Z"
			fill={fill}
		/>
		<path
			d="M6.75 8H3.75C3.55109 8 3.36032 8.07902 3.21967 8.21967C3.07902 8.36032 3 8.55109 3 8.75C3 8.94891 3.07902 9.13968 3.21967 9.28033C3.36032 9.42098 3.55109 9.5 3.75 9.5H6.75C6.94891 9.5 7.13968 9.42098 7.28033 9.28033C7.42098 9.13968 7.5 8.94891 7.5 8.75C7.5 8.55109 7.42098 8.36032 7.28033 8.21967C7.13968 8.07902 6.94891 8 6.75 8Z"
			fill={fill}
		/>
	</svg>
);

export default ProductIcon;