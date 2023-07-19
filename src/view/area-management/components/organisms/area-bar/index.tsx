import {Areas} from '@/domain/area/model';
import AreaIcon from '@/view/common/assets/icons/area';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeArea} from '@/view/common/store/slices/area';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import {Button, Loading} from 'posy-fnb-core';
import React from 'react';
import {BsList} from 'react-icons/bs';

type AreabarProps = {
	data: Areas | undefined;
	isLoading: boolean;
	openAddArea: () => void;
};

const Areabar = ({data, isLoading, openAddArea}: AreabarProps) => {
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();
	const {
		area: {selectedArea},
	} = useAppSelector(state => state);

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

				<div className="mt-4 px-4 overflow-y-auto flex h-full flex-col gap-3">
					{isLoading ? (
						<div className="mt-6">
							<Loading size={65} />
						</div>
					) : null}

					{data?.length === 0 ? (
						<div className="h-full flex flex-col justify-center items-center">
							<AreaIcon />
							<p className="text-m-medium mt-2">Please add new area first</p>
						</div>
					) : null}

					{data && (
						<>
							<div>
								<p className="text-l-regular">Choose Area</p>
							</div>
							{data.map(item => (
								<div key={item.uuid}>
									<Button
										onClick={() =>
											dispatch(
												onChangeArea({
													uuid: item.uuid,
													name: item.name,
													size: item.height.toString(),
													table: '',
												}),
											)
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
						</>
					)}
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
