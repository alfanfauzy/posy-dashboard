import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {UpdateTransaction} from '@/domain/transaction/repositories/UpdateTransactionRepository';
import {orderType} from '@/view/common/constants/order';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {validationSchemaUpdateTransaction} from '@/view/transaction/schemas/update-transaction';
import {ValidationSchemaUpdateTransactionType} from '@/view/transaction/schemas/update-transaction';
import {useUpdateTransactionViewModel} from '@/view/transaction/view-models/UpdateTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Modal} from 'antd';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import * as reactHookForm from 'react-hook-form';
import Select from 'react-select';

import TableTransactionGridView from '../content/TableTransactionGridView';

type CreateTransactionModalProps = {
	open: boolean;
	handleClose: (value: boolean) => void;
};

const CreateTransactionModal = ({
	open,
	handleClose,
}: CreateTransactionModalProps) => {
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedTrxId} = useAppSelector(state => state.transaction);
	const queryClient = useQueryClient();

	const methods = useForm({
		mode: 'onChange',
		schema: validationSchemaUpdateTransaction,
	});

	const {updateTransaction, isLoading: loadUpdateTransaction} =
		useUpdateTransactionViewModel({
			onSuccess: _data => {
				const data = _data as UpdateTransaction;
				if (data) {
					queryClient.invalidateQueries([GetTransactionsQueryKey]);
					queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				}
				handleClose(false);
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

	return (
		<Modal
			open={open}
			width={794}
			closable={false}
			footer={
				<div className="grid grid-cols-2 gap-2 p-4">
					<Button variant="secondary" onClick={() => handleClose(false)}>
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
			<div className="p-6 bg-[#2F265B] rounded-tr-xl rounded-tl-xl">
				<p className="text-center text-xxl-bold text-white mb-6">
					Create Transaction
				</p>
				<div className="grid grid-cols-3 gap-6">
					<reactHookForm.Controller
						control={control}
						name="transaction_category"
						render={({field: {onChange}}) => (
							<Select
								className="rounded-md !mt-0 text-l-regular h-10"
								onChange={e => {
									onChange(e);
									setValue('restaurant_outlet_table_uuid', '');
								}}
								value={watch('transaction_category')}
								options={orderType}
								placeholder="Select Type"
							/>
						)}
					/>

					<div>
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
					<Input
						size="l"
						placeholder="Customer name (Optional)"
						{...register('customer_name')}
						error={!!errors.customer_name}
					/>
				</div>
			</div>
			{watch('transaction_category.value') === 0 && (
				<div className="bg-[#CBC7DD] mx-auto p-10">
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
