import AreaIcon from '@/view/common/assets/icons/area';
import {useRouter} from 'next/router';
import React from 'react';

type EmptyAreaProps = {
	redirect?: boolean;
};

const EmptyArea = ({redirect}: EmptyAreaProps) => {
	const {push} = useRouter();

	return (
		<div className="h-full flex flex-col justify-center items-center">
			<AreaIcon />
			<p
				onClick={
					redirect ? () => push('/settings/area-management') : () => undefined
				}
				className={`text-l-medium mt-4 ${
					redirect
						? 'cursor-pointer hover:text-secondary-main hover:opacity-70'
						: ''
				}`}
			>
				Please add new area first
			</p>
		</div>
	);
};

export default EmptyArea;
