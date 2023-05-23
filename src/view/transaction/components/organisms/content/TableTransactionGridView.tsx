import {useAppSelector} from '@/view/common/store/hooks';
import {useGetTablesViewModel} from '@/view/table/view-models/GetTablesViewModel';
import {ValidationSchemaUpdateTransactionType} from '@/view/transaction/schemas/update-transaction';
import {Input, Loading} from 'posy-fnb-core';
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
			limit: 100,
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
				<article className="flex h-full items-center justify-center">
					<Loading size={90} />
				</article>
			)}
			{dataTable && (
				<aside className="grid grid-cols-5 gap-3">
					{dataTable.map(table => (
						<div
							key={table.uuid}
							role="presentation"
							className={`h-[100px] w-[100px] cursor-pointer rounded-2xl border p-4 shadow-sm duration-300 ease-in-out hover:border-[#5440BE] hover:border-4 active:shadow-md flex items-center justify-center justify-self-center
                            bg-white ${
															watch('restaurant_outlet_table_uuid') ===
															table.uuid
																? `border-[#5440BE] border-4 !bg-[#CCC4F6]`
																: `border-neutral-100`
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
											? `text-black`
											: `text-neutral-70`
									}
                                                        `}
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
