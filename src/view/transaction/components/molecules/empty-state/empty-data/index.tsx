import NoOrderIcon from '@/view/common/assets/icons/noOrder';
import React from 'react';

type EmptyDataProps = {
	message: string;
	iconSize?: number;
};

const EmptyData = ({message, iconSize}: EmptyDataProps) => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4">
			<NoOrderIcon width={iconSize} className="-mt-24" />
			<p className="text-l-medium">{message}</p>
		</div>
	);
};

export default EmptyData;
