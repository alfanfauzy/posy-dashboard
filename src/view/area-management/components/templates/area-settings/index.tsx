import {mapToAreasModel} from '@/data/area/mappers/AreaMapper';
import {GetAreaQueryKey} from '@/data/area/sources/GetAreaQuery';
import {useGetAreasViewModel} from '@/view/area-management/view-models/GetAreasViewModel';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React, {useState} from 'react';

import Areabar from '../../organisms/area-bar';
import AreaDetails from '../../organisms/area-details';

const AddNewAreaModal = dynamic(
	() => import('../../organisms/modal/AddNewAreaModal'),
	{
		loading: () => <div />,
	},
);

const EditAreaModal = dynamic(
	() => import('../../organisms/modal/EditAreaModal'),
	{
		loading: () => <div />,
	},
);

const DeleteAreaModal = dynamic(
	() => import('../../organisms/modal/DeleteAreaModal'),
	{
		loading: () => <div />,
	},
);

export type SelectedArea = {
	uuid: string;
	name: string;
	table: string;
	size: string;
};

const AreaSettings = () => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

	const [isOpenAddArea, {open: openAddArea, close: closeAddArea}] =
		useDisclosure({
			initialState: false,
		});
	const [isOpenEditArea, {open: openEditArea, close: closeEditArea}] =
		useDisclosure({
			initialState: false,
		});
	const [isOpenDeleteArea, {open: openDeleteArea, close: closeDeleteArea}] =
		useDisclosure({
			initialState: false,
		});

	const [selectedArea, setSelectedArea] = useState<SelectedArea | null>(null);

	const {data: dataArea, isLoading: loadArea} = useGetAreasViewModel(
		{
			restaurant_outlet_uuid: outletId,
		},
		{
			onSuccess: _data => {
				if (_data && !selectedArea) {
					const mappedDataArea = mapToAreasModel(_data.data.objs);
					const defaultArea: SelectedArea = {
						name: mappedDataArea?.[0].name,
						uuid: mappedDataArea?.[0].uuid,
						size: mappedDataArea?.[0].floor_size_name,
						table: mappedDataArea?.[0].total_table.toString(),
					};
					setSelectedArea(defaultArea);
					queryClient.invalidateQueries([GetAreaQueryKey]);
				}
			},
		},
	);

	const onSelectArea = (val: SelectedArea | null) => {
		setSelectedArea(val);
	};

	return (
		<>
			<AddNewAreaModal close={closeAddArea} isOpen={isOpenAddArea} />
			{selectedArea && (
				<EditAreaModal
					close={closeEditArea}
					isOpen={isOpenEditArea}
					selectedArea={selectedArea}
				/>
			)}

			{selectedArea && (
				<DeleteAreaModal
					isOpen={isOpenDeleteArea}
					close={closeDeleteArea}
					selectedArea={selectedArea}
					onSelectArea={onSelectArea}
				/>
			)}

			<main className="flex w-full gap-2">
				<Areabar
					data={dataArea}
					isLoading={loadArea}
					openAddArea={openAddArea}
					selectedArea={selectedArea}
					onSelectArea={onSelectArea}
				/>
				<AreaDetails
					openDeleteArea={openDeleteArea}
					openEditArea={openEditArea}
					selectedArea={selectedArea}
					onSelectArea={onSelectArea}
				/>
			</main>
		</>
	);
};

export default AreaSettings;
