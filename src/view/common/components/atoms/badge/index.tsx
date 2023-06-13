import React from 'react';

type BadgeProps = {
	count: number;
	className?: string;
};

const Badge = ({count, className}: BadgeProps) => {
	return (
		<div
			className={`${className} rounded-full w-fit px-1.5 bg-secondary-main shadow text-[9px] font-bold`}
		>
			{count > 99 ? '99+' : count}
		</div>
	);
};

export default Badge;
