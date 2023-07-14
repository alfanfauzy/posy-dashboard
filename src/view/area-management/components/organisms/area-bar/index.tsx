import {Areas} from '@/domain/area/model';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch} from '@/view/common/store/hooks';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import {Button, Loading} from 'posy-fnb-core';
import React from 'react';
import {BsList} from 'react-icons/bs';

import {SelectedArea} from '../../templates/area-settings';

type AreabarProps = {
	data: Areas | undefined;
	isLoading: boolean;
	openAddArea: () => void;
	selectedArea: SelectedArea | null;
	onSelectArea: (area: SelectedArea | null) => void;
};

const Areabar = ({
	data,
	isLoading,
	openAddArea,
	onSelectArea,
	selectedArea,
}: AreabarProps) => {
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();

	return (
		<section className="h-full w-1/3 overflow-y-hidden overflow-auto xl:rounded-r-lg rounded-lg bg-neutral-10">
			<aside className="flex h-full flex-col">
				<div className="flex items-center gap-4 px-4 pt-4 pb-2">
					{width <= 1280 && (
						<BsList
							onClick={() => dispatch(setOpenDrawer(true))}
							size={24}
							className="cursor-pointer text-neutral-100 hover:opacity-70 duration-300 ease-in-out"
						/>
					)}
					<p className="text-xxl-semibold text-neutral-100">Area Settings</p>
				</div>
				<div className="px-4">
					<p className="text-l-regular">Choose Area</p>
				</div>
				<div className="mt-4 px-4 overflow-y-auto flex h-full flex-col gap-3">
					{isLoading ? (
						<div className="mt-6">
							<Loading size={65} />
						</div>
					) : null}
					{data &&
						data.map(item => (
							<div key={item.uuid}>
								<Button
									onClick={() =>
										onSelectArea({
											uuid: item.uuid,
											name: item.name,
											size: item.height.toString(),
											table: '2',
										})
									}
									fullWidth
									size="m"
									variant="secondary"
									className={`${
										item.uuid === selectedArea?.uuid &&
										'border-secondary-main hover:border-secondary-main text-secondary-main'
									}`}
								>
									{item.name}
								</Button>
							</div>
						))}
				</div>
				<div className="mt-4 p-4 shadow-box-1 w-full">
					<Button size="m" fullWidth onClick={openAddArea}>
						Add New Area
					</Button>
				</div>
			</aside>
		</section>
	);
};

export default Areabar;
