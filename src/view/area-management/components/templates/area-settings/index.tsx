import {Area} from '@/domain/area/model';
import {useGetAreasViewModel} from '@/view/area-management/view-models/GetAreasViewModel';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
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

const DeleteAreaModal = dynamic(
	() => import('../../organisms/modal/DeleteAreaModal'),
	{
		loading: () => <div />,
	},
);

const AreaSettings = () => {
	const {outletId} = useAppSelector(state => state.auth);
	const [isOpenAddArea, {open: openAddArea, close: closeAddArea}] =
		useDisclosure({
			initialState: false,
		});
	const [isOpenDeleteArea, {open: openDeleteArea, close: closeDeleteArea}] =
		useDisclosure({
			initialState: false,
		});

	const [selectedArea, setSelectedArea] = useState<Area | null>(null);

	const {data: dataArea, isLoading: loadArea} = useGetAreasViewModel({
		restaurant_outlet_uuid: outletId,
	});

	const onSelectArea = (val: Area | null) => {
		setSelectedArea(val);
	};

	return (
		<>
			<AddNewAreaModal close={closeAddArea} isOpen={isOpenAddArea} />
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
					areaId={selectedArea?.uuid || ''}
				/>
			</main>
		</>
	);
};

export default AreaSettings;
