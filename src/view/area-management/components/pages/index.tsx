import {mapToAreasModel} from '@/data/area/mappers/AreaMapper';
import {GetAreaQueryKey} from '@/data/area/sources/GetAreaQuery';
import {useGetAreasViewModel} from '@/view/area-management/view-models/GetAreasViewModel';
import {useAppSelector} from '@/view/common/store/hooks';
import {onChangeArea} from '@/view/common/store/slices/area';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React from 'react';

import Areabar from '../templates/area-bar';
import AreaDetails from '../templates/area-details';

const AddNewAreaModal = dynamic(
	() => import('../organisms/modal/AddNewAreaModal'),
	{
		loading: () => <div />,
	},
);

const EditAreaModal = dynamic(
	() => import('../organisms/modal/EditAreaModal'),
	{
		loading: () => <div />,
	},
);

const DeleteAreaModal = dynamic(
	() => import('../organisms/modal/DeleteAreaModal'),
	{
		loading: () => <div />,
	},
);

const ViewAreaManagementPage = () => {
	const queryClient = useQueryClient();
	const {
		auth: {outletId},
		area: {selectedArea},
	} = useAppSelector(state => state);

	const {data: dataArea, isLoading: loadArea} = useGetAreasViewModel(
		{
			restaurant_outlet_uuid: outletId,
		},
		{
			onSuccess: _data => {
				if (_data && !selectedArea) {
					const mappedDataArea = mapToAreasModel(_data.data.objs);
					const defaultArea = {
						name: mappedDataArea?.[0].name,
						uuid: mappedDataArea?.[0].uuid,
						size: mappedDataArea?.[0].floor_size_name,
						table: mappedDataArea?.[0].total_table.toString(),
					};
					onChangeArea(defaultArea);
					queryClient.invalidateQueries([GetAreaQueryKey]);
				}
			},
		},
	);

	return (
		<>
			<AddNewAreaModal />
			{selectedArea && <EditAreaModal />}
			{selectedArea && <DeleteAreaModal />}
			<main className="h-full w-full flex gap-2">
				<Areabar data={dataArea} isLoading={loadArea} />
				<AreaDetails />
			</main>
		</>
	);
};

export default ViewAreaManagementPage;
