import FilterChip from '@/view/common/components/atoms/chips/filter-chip';
import useClickOutside from '@/view/common/hooks/useClickOutside';
import {useAppSelector} from '@/view/common/store/hooks';
import {useGetTableStatusViewModel} from '@/view/transaction/view-models/GetTableStatusViewModel';
import {useGetTransactionSummaryViewModel} from '@/view/transaction/view-models/GetTransactionSummaryViewModel';
import {Loading} from 'posy-fnb-core';
import React, {useRef} from 'react';

type TableGridViewProps = {
	closeTableCapacity: () => void;
};

const TableGridView = ({closeTableCapacity}: TableGridViewProps) => {
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);

	const ref = useRef<HTMLDivElement>(null);
	useClickOutside({ref, handleClick: closeTableCapacity});

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
		<section className="h-screen w-screen bg-neutral-100 bg-opacity-60 z-50 inset-0 absolute">
			<article className="h-full w-full flex flex-col items-center justify-center">
				<div ref={ref}>
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

export default TableGridView;
