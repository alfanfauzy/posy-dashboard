import {Area} from '@/domain/area/model';
import {useGetAreasViewModel} from '@/view/area-management/view-models/GetAreasViewModel';
import {useAppSelector} from '@/view/common/store/hooks';
import {useGetTablesViewModel} from '@/view/table-management/view-models/GetTablesViewModel';
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

	const [selectedArea, setSelectedArea] = React.useState<Area | undefined>(
		undefined,
	);

	const {setValue, watch, trigger} = methods;

	const {data: dataArea} = useGetAreasViewModel({
		show_waiting_food: false,
		restaurant_outlet_uuid: outletId,
	});

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
				{
					field: 'floor_area_uuid',
					value: selectedArea?.uuid || '',
				},
			],
		},
		{
			enabled:
				orderType === 0 && isSubscription && isLoggedIn && !!selectedArea,
		},
	);

	const onChangeSelectArea = (area: Area) => {
		setSelectedArea(area);
		setValue('restaurant_outlet_table_uuid', '');
		trigger();
	};

	return (
		<section>
			{dataArea && (
				<div className={`px-4 grid gap-4 grid-cols-${dataArea?.length}`}>
					{dataArea.map(area => (
						<div
							key={area.uuid}
							onClick={() => onChangeSelectArea(area)}
							className={`px-2 py-1 border flex items-center justify-center cursor-pointer hover:opacity-70 rounded-full whitespace-nowrap ${
								selectedArea && selectedArea.uuid === area.uuid
									? 'border-secondary-main bg-secondary-border'
									: 'border-neutral-50 bg-neutral-10'
							}`}
						>
							<p>{area.name}</p>
						</div>
					))}
				</div>
			)}

			{loadTable && selectedArea && (
				<article className="flex h-full items-center justify-center my-6">
					<Loading size={90} />
				</article>
			)}

			{dataTable && selectedArea && (
				<aside className="mt-4 grid grid-cols-5 gap-3 px-4 py-2">
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
