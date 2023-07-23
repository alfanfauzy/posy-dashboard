import {Areas} from '@/domain/area/model';
import NavDrawer from '@/view/common/components/molecules/nav-drawer';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onOpenEditLayout} from '@/view/common/store/slices/table';
import {Button} from 'posy-fnb-core';
import React from 'react';

type TableSettingsProps = {
	isLoadingSaveTable: boolean;
	dataArea: Areas;
};

const TableSettingHeader = ({
	dataArea,
	isLoadingSaveTable,
}: TableSettingsProps) => {
	const dispatch = useAppDispatch();
	const {isEditLayout} = useAppSelector(state => state.table);

	return (
		<aside className="flex items-center gap-4">
			<div className="flex w-full justify-between items-end">
				<NavDrawer title="Table Settings" />
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
