import type {IconType} from '@/types/icon';
import React from 'react';

export const Logo = ({
	fill = '#2F265B',
	width = 36,
	height = 36,
	onClick,
	className,
}: IconType) => (
	<svg
		onClick={onClick}
		className={className}
		width={width}
		height={height}
		viewBox="0 0 36 36"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect width="36" height="36" rx="8" fill={fill} />
		<path
			d="M10.3223 28.4208V7.75098H18.4772C20.0449 7.75098 21.3805 8.05039 22.484 8.64923C23.5874 9.24133 24.4285 10.0656 25.0071 11.1219C25.5925 12.1716 25.8852 13.3827 25.8852 14.7553C25.8852 16.1279 25.5892 17.339 24.9971 18.3887C24.405 19.4383 23.5471 20.2558 22.4234 20.8412C21.3065 21.4266 19.9541 21.7193 18.3661 21.7193H13.1684V18.2171H17.6597C18.5007 18.2171 19.1938 18.0724 19.7388 17.7831C20.2905 17.4871 20.7009 17.08 20.9701 16.5619C21.2459 16.0371 21.3839 15.4349 21.3839 14.7553C21.3839 14.069 21.2459 13.4702 20.9701 12.9588C20.7009 12.4407 20.2905 12.0404 19.7388 11.7578C19.187 11.4685 18.4873 11.3238 17.6395 11.3238H14.6924V28.4208H10.3223Z"
			fill="white"
		/>
	</svg>
);

export default Logo;
