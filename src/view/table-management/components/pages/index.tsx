import {mapToTableLayoutModel} from '@/data/table/mappers/TableMapper';
import {TableLayout} from '@/domain/table/model/TableLayout';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {Loading} from 'posy-fnb-core';
import {useState} from 'react';

import {useGetTableLayoutByFloorViewModel} from '../../view-models/GetTableLayoutByFloorViewModel';
import Board from '../organisms/board';
import TableManagementSidebar from '../templates/table-management-sidebar';

const ViewTableManagementPage = () => {
	const {outletId} = useAppSelector(state => state.auth);
	const [table, setTablePos] = useState<TableLayout>([]);

	const [isEditLayout, {open: openEditLayout, close: closeEditLayout}] =
		useDisclosure({initialState: false});

	const {data, isLoading} = useGetTableLayoutByFloorViewModel(
		{
			restaurant_outlet_uuid: outletId,
			area_uuid: 'ca73e64b-f3be-40e8-a386-90b7094abd81',
		},
		{
			onSuccess: _data => {
				if (_data) {
					const mappedData = mapToTableLayoutModel(_data.data);
					setTablePos(mappedData);
				}
			},
		},
	);

	if (isLoading) {
		return (
			<div className="flex h-screen bg-white items-center justify-center">
				<Loading size={80} />
			</div>
		);
	}

	return (
		<>
			{data && table.length > 0 ? (
				<main className="h-full w-full flex gap-2">
					<Board
						isEditLayout={isEditLayout}
						closeEditLayout={closeEditLayout}
						openEditLayout={openEditLayout}
						table={table}
						setTablePos={setTablePos}
						dataArea={{height: 6, width: 8}}
					/>
					<TableManagementSidebar />
				</main>
			) : null}
		</>
	);
};

export default ViewTableManagementPage;
