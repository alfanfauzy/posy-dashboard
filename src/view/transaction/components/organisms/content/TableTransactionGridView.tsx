import {useAppSelector} from '@/view/common/store/hooks';
import {useGetTablesViewModel} from '@/view/table/view-models/GetTablesViewModel';
import {ValidationSchemaUpdateTransactionType} from '@/view/transaction/schemas/update-transaction';
import {Loading} from 'posy-fnb-core';
import React from 'react';
import * as reactHookForm from 'react-hook-form';

type TableTransactionGridView = {
	orderType: number;
	methods: reactHookForm.UseFormReturn<ValidationSchemaUpdateTransactionType>;
};

const TableTransactionGridView = ({
	orderType,
	methods,
}: TableTransactionGridView) => {
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);

	const {setValue, watch, trigger} = methods;

	const {data: dataTable, isLoading: loadTable} = useGetTablesViewModel(
		{
			limit: 200,
			sort: {
				field: 'priority',
				value: 'asc',
			},
			search: [
				{
					field: 'restaurant_outlet_uuid',
					value: outletId,
				},
			],
		},
		{enabled: orderType === 0 && isSubscription && isLoggedIn},
	);

	return (
		<section>
			{loadTable && (
				<article className="flex h-full items-center justify-center my-6">
					<Loading size={90} />
				</article>
			)}
			{dataTable && (
				<aside className="grid grid-cols-5 gap-3 px-4 py-2">
					{dataTable.map(table => (
						<div
							key={table.uuid}
							role="presentation"
							className={`h-[110px] w-full cursor-pointer rounded-lg p-4 shadow-sm duration-300 ease-in-out hover:border-secondary-hover hover:border-4 active:shadow-md flex items-center justify-center justify-self-center
                            bg-white ${
															watch('restaurant_outlet_table_uuid') ===
															table.uuid
																? `border-secondary-hover border-[3px] !bg-secondary-border`
																: `border-neutral-30 border shadow-sm`
														}
									`}
							onClick={() => {
								setValue('restaurant_outlet_table_uuid', table.uuid);
								trigger();
							}}
						>
							<div className="flex items-center justify-center pb-2">
								<p
									className={`text-4xl font-normal ${
										watch('restaurant_outlet_table_uuid') === table.uuid
											? `text-primary-main`
											: `text-neutral-70`
									}`}
								>
									{table.table_number || '-'}
								</p>
							</div>
						</div>
					))}
				</aside>
			)}
		</section>
	);
};

export default TableTransactionGridView;
