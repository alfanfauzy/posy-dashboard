import {Area, Areas} from '@/domain/area/model';
import NavDrawer from '@/view/common/components/molecules/nav-drawer';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeArea,
	onChangeToggleAddArea,
} from '@/view/common/store/slices/area';
import EmptyArea from '@/view/transaction/components/molecules/empty-area';
import {Button, Loading} from 'posy-fnb-core';
import React from 'react';

type AreabarProps = {
	data: Areas | undefined;
	isLoading: boolean;
};

const Areabar = ({data, isLoading}: AreabarProps) => {
	const dispatch = useAppDispatch();
	const {
		area: {selectedArea},
	} = useAppSelector(state => state);

	const isAreaEmpty = (!data || data?.length === 0) && !isLoading;

	const onAddArea = (item: Area) =>
		dispatch(
			onChangeArea({
				uuid: item.uuid,
				name: item.name,
				size: item.height.toString(),
				table: '',
			}),
		);

	return (
		<section className="h-full w-1/3 overflow-y-hidden overflow-auto xl:rounded-r-lg rounded-lg bg-neutral-10">
			<aside className="flex h-full flex-col">
				<NavDrawer title="Area Settings" className="px-4 pt-4 pb-2" />

				<div className="mt-4 px-4 overflow-y-auto flex h-full flex-col gap-3">
					{isLoading ? (
						<div className="mt-6">
							<Loading size={65} />
						</div>
					) : null}

					{isAreaEmpty ? <EmptyArea /> : null}

					{data && (
						<>
							<div>
								<p className="text-l-regular">Choose Area</p>
							</div>
							{data.map(item => (
								<div key={item.uuid}>
									<Button
										onClick={() => onAddArea(item)}
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
					<Button
						size="m"
						fullWidth
						onClick={() => dispatch(onChangeToggleAddArea(true))}
					>
						Add New Area
					</Button>
				</div>
			</aside>
		</section>
	);
};

export default Areabar;
