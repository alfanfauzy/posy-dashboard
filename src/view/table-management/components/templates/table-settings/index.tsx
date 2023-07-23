import {Areas} from '@/domain/area/model';
import {TableLayout} from '@/domain/table/model/TableLayout';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeSelectedArea,
	onCloseEditLayout,
} from '@/view/common/store/slices/table';
import {useUpdateSaveTableLayoutViewModel} from '@/view/table-management/view-models/UpdateSaveTableLayoutViewModel';
import EmptyArea from '@/view/transaction/components/molecules/empty-state/empty-area';
import dynamic from 'next/dynamic';
import {Loading} from 'posy-fnb-core';

import FloorList from '../../molecules/floor-list';
import TableSettingBoard from '../../organisms/table-setting-board';
import TableSettingHeader from '../../organisms/table-setting-header';

const AddTableModal = dynamic(
	() => import('../../organisms/modal/AddTableModal'),
	{
		loading: () => <div />,
	},
);

type TableSettingsProps = {
	dataArea: Areas;
	isLoading: boolean;
	tablePos: TableLayout;
	setTablePos: (tablePos: TableLayout) => void;
};

const TableSettings = ({
	dataArea,
	isLoading,
	tablePos,
	setTablePos,
}: TableSettingsProps) => {
	const dispatch = useAppDispatch();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedArea, addTable} = useAppSelector(state => state.table);

	const {UpdateSaveTableLayout, isLoading: isLoadingSaveTable} =
		useUpdateSaveTableLayoutViewModel({
			onSuccess: () => {
				dispatch(onCloseEditLayout());
			},
		});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		UpdateSaveTableLayout({
			floor_area_uuid: selectedArea?.uuid || '',
			restaurant_outlet_uuid: outletId,
			layout: tablePos,
		});
	};

	return (
		<>
			{addTable.isOpen && <AddTableModal />}

			<form
				onSubmit={handleSubmit}
				className="relative h-full flex-1 overflow-y-hidden overflow-x-hidden overflow-auto p-4 xl:rounded-r-lg rounded-lg bg-neutral-10"
			>
				<TableSettingHeader
					dataArea={dataArea || []}
					isLoadingSaveTable={isLoadingSaveTable}
				/>
				{isLoading ? (
					<div className="flex h-full justify-center items-center">
						<Loading size={80} />
					</div>
				) : null}

				{dataArea.length === 0 && !isLoading && <EmptyArea redirect />}

				{dataArea.length > 0 && selectedArea ? (
					<TableSettingBoard tablePos={tablePos} setTablePos={setTablePos} />
				) : null}

				<FloorList
					dataArea={dataArea}
					selectedArea={selectedArea}
					onChangeSelectArea={val => dispatch(onChangeSelectedArea(val))}
				/>
			</form>
		</>
	);
};

export default TableSettings;
