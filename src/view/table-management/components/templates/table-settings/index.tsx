import {Areas} from '@/domain/area/model';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeSelectedArea,
	onCloseEditLayout,
} from '@/view/common/store/slices/table';
import {useUpdateSaveTableLayoutViewModel} from '@/view/table-management/view-models/UpdateSaveTableLayoutViewModel';
import EmptyArea from '@/view/transaction/components/molecules/empty-area';
import dynamic from 'next/dynamic';

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
};

const TableSettings = ({dataArea}: TableSettingsProps) => {
	const dispatch = useAppDispatch();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedArea, tableLayout, addTable} = useAppSelector(
		state => state.table,
	);

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
			layout: tableLayout,
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

				{dataArea.length === 0 && <EmptyArea redirect />}

				{dataArea.length > 0 && selectedArea ? <TableSettingBoard /> : null}

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
