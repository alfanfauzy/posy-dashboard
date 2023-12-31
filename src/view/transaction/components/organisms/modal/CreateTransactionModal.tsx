import {GetTransactionQueryKey} from '@/data/transaction/sources/GetTransactionQuery';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {Transaction} from '@/domain/transaction/model';
import {UpdateTransaction} from '@/domain/transaction/repositories/UpdateTransactionRepository';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeIsOpenCreateTransaction} from '@/view/common/store/slices/transaction';
import {
	orderTransactionType,
	orderType,
} from '@/view/transaction/constants/order';
import {validationSchemaUpdateTransaction} from '@/view/transaction/schemas/update-transaction';
import {ValidationSchemaUpdateTransactionType} from '@/view/transaction/schemas/update-transaction';
import {useUpdateTransactionViewModel} from '@/view/transaction/view-models/UpdateTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Modal} from 'antd';
import {Button, Input} from 'posy-fnb-core';
import React, {useEffect} from 'react';
import * as reactHookForm from 'react-hook-form';
import Select from 'react-select';

import TableTransactionGridView from '../content/TableTransactionGridView';

type CreateTransactionModalProps = {
	isEdit?: boolean;
	dataTransaction?: Transaction | undefined;
};

const CreateTransactionModal = ({
	isEdit,
	dataTransaction,
}: CreateTransactionModalProps) => {
	const dispatch = useAppDispatch();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedTrxId, isOpenCreateTransaction} = useAppSelector(
		state => state.transaction,
	);
	const queryClient = useQueryClient();

	const methods = useForm({
		mode: 'onChange',
		schema: validationSchemaUpdateTransaction,
	});

	const handleClose = () => dispatch(onChangeIsOpenCreateTransaction(false));

	const {updateTransaction, isLoading: loadUpdateTransaction} =
		useUpdateTransactionViewModel({
			onSuccess: _data => {
				const data = _data as UpdateTransaction;
				if (data) {
					queryClient.invalidateQueries([GetTransactionsQueryKey]);
					queryClient.invalidateQueries([GetTransactionQueryKey]);
					queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				}
				handleClose();
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

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: {errors, isValid},
	} = methods;

	useEffect(() => {
		if (isEdit) {
			const {
				total_pax,
				customer_name,
				transaction_category,
				restaurant_outlet_table_uuid,
			} = dataTransaction as Transaction;

			const selectTransactionCategory =
				orderTransactionType[transaction_category];

			setValue('customer_name', customer_name);
			setValue('total_pax', total_pax > 0 ? total_pax.toString() : undefined);
			setValue('transaction_category', selectTransactionCategory);
			setValue(
				'restaurant_outlet_table_uuid',
				restaurant_outlet_table_uuid?.toString() || '',
			);
		}
	}, [dataTransaction, isEdit, setValue]);

	return (
		<Modal
			style={{
				top: 15,
			}}
			open={isOpenCreateTransaction}
			onCancel={handleClose}
			width={794}
			closable={false}
			footer={
				<div className="grid grid-cols-2 gap-2 px-4 pb-4 pt-2">
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						disabled={!isValid}
						type="submit"
						size="l"
						variant="primary"
						fullWidth
						className="disabled:bg-neutral-10 disabled:border disabled:border-neutral-50 disabled:text-neutral-50"
						isLoading={loadUpdateTransaction}
						onClick={handleSubmit(onSubmit)}
					>
						Save
					</Button>
				</div>
			}
		>
			<div className="p-6 bg-gradient-to-r from-primary-main to-secondary-main rounded-tr-xl rounded-tl-xl">
				<p className="text-center text-xxl-bold text-white mb-3">
					{isEdit ? 'Edit' : 'Create New'} Transaction
				</p>
				<div className="grid grid-cols-3 gap-4">
					<div>
						<p className="text-neutral-10 mb-1">Transaction Type</p>
						<reactHookForm.Controller
							control={control}
							name="transaction_category"
							render={({field: {onChange}}) => (
								<Select
									isSearchable={false}
									className="rounded-md !mt-0 text-l-regular h-10"
									onChange={e => {
										onChange(e);
										setValue('restaurant_outlet_table_uuid', '', {
											shouldValidate: true,
										});
									}}
									value={watch('transaction_category')}
									options={orderType}
									placeholder="Select Type"
								/>
							)}
						/>
					</div>
					<div>
						<p className="text-neutral-10 mb-1">Pax (Optional)</p>
						<Input
							size="l"
							placeholder="Pax (Optional)"
							inputMode="numeric"
							pattern="[0-9]*"
							{...register('total_pax', {
								setValueAs: v => v.replace(/\D/, ''),
							})}
							value={watch('total_pax')}
							error={!!errors.total_pax}
						/>
					</div>
					<div>
						<p className="text-neutral-10 mb-1">Customer name (Optional)</p>
						<Input
							size="l"
							placeholder="Customer name (Optional)"
							{...register('customer_name')}
							error={!!errors.customer_name}
						/>
					</div>
				</div>
			</div>
			{watch('transaction_category.value') === 0 && (
				<div className="bg-gradient-to-r from-[#CBC7DD] to-neutral-10 mx-auto p-4 max-h-[300px] overflow-auto">
					<Input
						size="m"
						className="hidden"
						{...register('restaurant_outlet_table_uuid')}
						error={!!errors.restaurant_outlet_table_uuid}
					/>
					<TableTransactionGridView
						orderType={watch('transaction_category.value')}
						methods={methods}
					/>
				</div>
			)}
		</Modal>
	);
};

export default CreateTransactionModal;
