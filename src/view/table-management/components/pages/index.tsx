import {mapToTableLayoutModel} from '@/data/table/mappers/TableMapper';
import {TableLayout} from '@/domain/table/model/TableLayout';
import {useGetAreasViewModel} from '@/view/area-management/view-models/GetAreasViewModel';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeSelectedArea} from '@/view/common/store/slices/table';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import React, {useEffect} from 'react';

import {useGetTableLayoutByFloorViewModel} from '../../view-models/GetTableLayoutByFloorViewModel';
import TableDetailSidebar from '../templates/table-detail-sidebar';
import TableSettings from '../templates/table-settings';

const ViewTableManagementPage = () => {
	const dispatch = useAppDispatch();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedArea} = useAppSelector(state => state.table);
	const [tablePos, setTablePos] = React.useState<TableLayout>([]);

	const {data: dataArea, isLoading: loadArea} = useGetAreasViewModel(
		{
			restaurant_outlet_uuid: outletId,
		},
		{
			onSuccess: dt => {
				if (dt?.data?.objs?.length > 0) {
					dispatch(onChangeSelectedArea(dt.data.objs[0]));
				}
			},
		},
	);

	const {isLoading: loadTableLayout} = useGetTableLayoutByFloorViewModel(
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

	const isLoading = (loadTableLayout && !!selectedArea) || loadArea;

	useEffect(() => {
		logEvent({
			category: 'table_management',
			action: 'table_management_view',
		});
	}, []);

	return (
		<>
			<main className="h-full w-full flex gap-2">
				<TableSettings
					dataArea={dataArea || []}
					isLoading={isLoading}
					tablePos={tablePos}
					setTablePos={setTablePos}
				/>
				<TableDetailSidebar />
			</main>
		</>
	);
};

export default ViewTableManagementPage;
