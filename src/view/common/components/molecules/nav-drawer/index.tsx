import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch} from '@/view/common/store/hooks';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import React from 'react';
import {BsList} from 'react-icons/bs';

type NavDrawerProps = {
	title: string;
	className?: string;
};

const NavDrawer = ({title, className}: NavDrawerProps) => {
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			{width <= 1280 && (
				<BsList
					onClick={() => dispatch(setOpenDrawer(true))}
					size={24}
					className="cursor-pointer text-neutral-100 hover:opacity-70 duration-300 ease-in-out"
				/>
			)}
			<p className="text-xxl-semibold text-neutral-100">{title}</p>
		</div>
	);
};

export default NavDrawer;
