import {Areas} from '@/domain/area/model';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import {onOpenEditLayout} from '@/view/common/store/slices/table';
import {Button} from 'posy-fnb-core';
import React from 'react';
import {BsList} from 'react-icons/bs';

type TableSettingsProps = {
	isLoadingSaveTable: boolean;
	dataArea: Areas;
};

const TableSettingHeader = ({
	dataArea,
	isLoadingSaveTable,
}: TableSettingsProps) => {
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();
	const {isEditLayout} = useAppSelector(state => state.table);

	return (
		<aside className="flex items-center gap-4">
			{width <= 1280 && (
				<BsList
					onClick={() => dispatch(setOpenDrawer(true))}
					size={24}
					className="cursor-pointer text-neutral-100 hover:opacity-70 duration-300 ease-in-out"
				/>
			)}
			<div className="flex w-full justify-between items-end">
				<p className="text-xxl-semibold text-neutral-100">Table Settings</p>
				{!isEditLayout && dataArea.length > 0 && (
					<p
						onClick={() => dispatch(onOpenEditLayout())}
						className="text-m-medium text-neutral-100 cursor-pointer hover:opacity-70 duration-300 ease-in-out"
					>
						Edit Layout
					</p>
				)}
				{isEditLayout && dataArea.length > 0 && (
					<Button isLoading={isLoadingSaveTable} type="submit" size="m">
						Save
					</Button>
				)}
			</div>
		</aside>
	);
};

export default TableSettingHeader;
