import {mapToTableLayoutModel} from '@/data/table/mappers/TableMapper';
import {Area} from '@/domain/area/model';
import {Table} from '@/domain/table/model';
import {TableLayout} from '@/domain/table/model/TableLayout';
import {useGetAreasViewModel} from '@/view/area-management/view-models/GetAreasViewModel';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {Loading} from 'posy-fnb-core';
import {useState} from 'react';

import {useGetTableLayoutByFloorViewModel} from '../../view-models/GetTableLayoutByFloorViewModel';
import TableBoard from '../templates/table-board';
import TableManagementSidebar from '../templates/table-management-sidebar';

const ViewTableManagementPage = () => {
	const {outletId} = useAppSelector(state => state.auth);
	const [table, setTablePos] = useState<TableLayout>([]);
	const [selectedArea, setSelectedArea] = useState<Area>();
	const [selectedTable, setSelectedTable] = useState<Table | null>(null);

	const [isEditLayout, {open: openEditLayout, close: closeEditLayout}] =
		useDisclosure({initialState: false});

	const onChangeSelectedArea = (val: Area) => {
		setSelectedArea(val);
		setSelectedTable(null);
	};
	const onChangeSelectedTable = (val: Table | null) => setSelectedTable(val);

	const {data: dataArea, isLoading: loadAreaa} = useGetAreasViewModel(
		{
			restaurant_outlet_uuid: outletId,
		},
		{
			onSuccess: dt => {
				onChangeSelectedArea(dt.data.objs[0]);
			},
		},
	);

	const {data: dataTable, isLoading: loadTable} =
		useGetTableLayoutByFloorViewModel(
			{
				restaurant_outlet_uuid: outletId,
				area_uuid: selectedArea?.uuid || '',
			},
			{
				enabled: !!selectedArea?.uuid,
				onSuccess: _data => {
					if (_data) {
						const mappedData = mapToTableLayoutModel(_data.data);
						setTablePos(mappedData);
					}
				},
			},
		);

	if (loadTable || loadAreaa) {
		return (
			<div className="flex h-screen bg-white items-center justify-center">
				<Loading size={80} />
			</div>
		);
	}

	return (
		<>
			{dataTable && dataArea && selectedArea && table.length > 0 ? (
				<main className="h-full w-full flex gap-2">
					<TableBoard
						isEditLayout={isEditLayout}
						closeEditLayout={closeEditLayout}
						openEditLayout={openEditLayout}
						table={table}
						setTablePos={setTablePos}
						dataArea={{
							height: selectedArea?.height,
							width: selectedArea?.width,
						}}
						areaList={dataArea}
						selectedArea={selectedArea}
						onChangeSelectedArea={onChangeSelectedArea}
						selectedTable={selectedTable}
						onChangeSelectedTable={onChangeSelectedTable}
					/>
					<TableManagementSidebar
						selectedTable={selectedTable}
						onChangeSelectedTable={onChangeSelectedTable}
					/>
				</main>
			) : null}
		</>
	);
};

export default ViewTableManagementPage;
