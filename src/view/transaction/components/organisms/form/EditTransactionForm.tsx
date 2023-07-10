import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {UpdateTransaction} from '@/domain/transaction/repositories/UpdateTransactionRepository';
import {orderType} from '@/view/common/constants/order';
import {useAppSelector} from '@/view/common/store/hooks';
import {useGetTablesViewModel} from '@/view/table-management/view-models/GetTablesViewModel';
import {ValidationSchemaUpdateTransactionType} from '@/view/transaction/schemas/update-transaction';
import {useUpdateTransactionViewModel} from '@/view/transaction/view-models/UpdateTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Button, Input, Select} from 'posy-fnb-core';
import React from 'react';
import {Controller} from 'react-hook-form';
import * as reactHookForm from 'react-hook-form';

type EditTransactionFormProps = {
	methods: reactHookForm.UseFormReturn<ValidationSchemaUpdateTransactionType>;
};

const EditTransactionForm = ({methods}: EditTransactionFormProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedTrxId} = useAppSelector(state => state.transaction);

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: {errors, isValid},
	} = methods;

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
		{enabled: !!selectedTrxId},
	);

	const {updateTransaction, isLoading: loadUpdateTransaction} =
		useUpdateTransactionViewModel({
			onSuccess: _data => {
				const data = _data as UpdateTransaction;
				if (data) {
					queryClient.invalidateQueries([GetTransactionsQueryKey]);
					queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				}
			},
		});

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaUpdateTransactionType
	> = form => {
		updateTransaction({
			...form,
			transaction_uuid: selectedTrxId,
			restaurant_outlet_uuid: outletId,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex gap-4">
				<div className="w-2/3">
					<div>
						<Input
							size="m"
							labelText="Customer name"
							{...register('customer_name')}
							error={!!errors.customer_name}
						/>
					</div>
					<div className="mt-3">
						<Controller
							control={control}
							name="transaction_category"
							render={({field: {onChange}}) => (
								<Select
									size="m"
									labelText="Dine in / Take away"
									onChange={onChange}
									value={watch('transaction_category')}
									options={orderType}
									placeholder="Select Type"
									error={!!errors.transaction_category}
								/>
							)}
						/>
					</div>
				</div>
				<div className="w-1/3">
					<div>
						<Input
							size="m"
							labelText="Pax"
							{...register('total_pax')}
							error={!!errors.total_pax}
						/>
					</div>

					<div className="mt-3">
						<Controller
							control={control}
							name="restaurant_outlet_table_uuid"
							render={({field: {onChange}}) => (
								<Select
									disabled={
										loadTable || watch('transaction_category.value') === 1
									}
									isLoading={loadTable}
									size="m"
									labelText="Table"
									onChange={onChange}
									options={
										dataTable?.map(el => ({
											label: el.table_number,
											value: el.uuid,
										})) || []
									}
									placeholder="table"
									error={!!errors.restaurant_outlet_table_uuid}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<Button
				type="submit"
				disabled={!isValid}
				size="l"
				variant="secondary"
				fullWidth
				className="mt-4 disabled:bg-neutral-10 disabled:border disabled:border-neutral-50 disabled:text-neutral-50"
				isLoading={loadUpdateTransaction}
			>
				Save
			</Button>
		</form>
	);
};

export default EditTransactionForm;
