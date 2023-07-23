import FilterChip from '@/view/common/components/atoms/chips/filter-chip';
import useClickOutside from '@/view/common/hooks/useClickOutside';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeToggleTableCapacity} from '@/view/common/store/slices/transaction';
import {useGetTableStatusViewModel} from '@/view/transaction/view-models/GetTableStatusViewModel';
import {useGetTransactionSummaryViewModel} from '@/view/transaction/view-models/GetTransactionSummaryViewModel';
import {Loading} from 'posy-fnb-core';
import React, {useRef} from 'react';

const TableCapacity = () => {
	const dispatch = useAppDispatch();
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);

	const tableCapacityRef = useRef<HTMLDivElement>(null);
	useClickOutside({
		ref: tableCapacityRef,
		handleClick: () => dispatch(onChangeToggleTableCapacity(false)),
	});

	const {data, isLoading} = useGetTableStatusViewModel(
		{
			restaurant_outlet_uuid: outletId,
		},
		{
			enabled: outletId.length > 0 && isSubscription && isLoggedIn,
		},
	);

	const {data: dataSummary, isLoading: loadSummary} =
		useGetTransactionSummaryViewModel(
			{
				restaurant_outlet_uuid: outletId,
			},
			{
				enabled: outletId.length > 0 && isSubscription && isLoggedIn,
			},
		);

	return (
		<section className="min-h-screen w-screen overflow-auto bg-neutral-100 bg-opacity-60 z-50 inset-0 absolute">
			<article className="py-10 w-full flex flex-col items-center justify-center">
				<div ref={tableCapacityRef}>
					{(isLoading || loadSummary) && (
						<div className="flex h-full items-center justify-center">
							<Loading size={90} />
						</div>
					)}
					{data && dataSummary && (
						<div className="w-fit h-fit">
							<div>
								<FilterChip
									label={`Table Capacity: ${dataSummary.available_capacity}/${dataSummary.table_capacity}`}
								/>
							</div>

							<aside className="mt-4 grid grid-cols-5 gap-4">
								{data.map(table => (
									<div
										key={table.table_uuid}
										role="presentation"
										className={`h-[124px] w-[130px] cursor-pointer rounded-lg border p-4 shadow-sm duration-300 ease-in-out hover:border-primary-main active:shadow-md flex items-center justify-center ${
											table.is_available
												? 'bg-white border-neutral-100'
												: 'bg-light-red border-red-caution'
										}`}
									>
										<div className="flex items-center justify-center pb-2">
											<p className="text-4xl font-normal text-neutral-70">
												{table.table_number || '-'}
											</p>
										</div>
									</div>
								))}
							</aside>
						</div>
					)}
				</div>
			</article>
		</section>
	);
};

export default TableCapacity;
