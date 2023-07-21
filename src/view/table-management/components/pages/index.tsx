import {mapToTableLayoutModel} from '@/data/table/mappers/TableMapper';
import {useGetAreasViewModel} from '@/view/area-management/view-models/GetAreasViewModel';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeSelectedArea,
	onChangeTableLayout,
} from '@/view/common/store/slices/table';

import {useGetTableLayoutByFloorViewModel} from '../../view-models/GetTableLayoutByFloorViewModel';
import TableDetailSidebar from '../templates/table-detail-sidebar';
import TableSettings from '../templates/table-settings';

const ViewTableManagementPage = () => {
	const dispatch = useAppDispatch();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedArea} = useAppSelector(state => state.table);

	const {data: dataArea} = useGetAreasViewModel(
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
					dispatch(onChangeTableLayout(mappedData));
				}
			},
		},
	);

	return (
		<>
			<main className="h-full w-full flex gap-2">
				<TableSettings dataArea={dataArea || []} />
				<TableDetailSidebar />
			</main>
		</>
	);
};

export default ViewTableManagementPage;
