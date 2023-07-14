import {GetTableLayoutByFloorQueryKey} from '@/data/table/sources/GetTableLayoutByFloorQuery';
import {Table} from '@/domain/table/model';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {
	validationSchemaCreateTransactionFromTableView,
	ValidationSchemaCreateTransactionFromTableViewType,
} from '@/view/transaction/schemas/create-transaction';
import {useCreateTransactionViewModel} from '@/view/transaction/view-models/CreateTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Modal} from 'antd';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import * as reactHookForm from 'react-hook-form';

type CreateTransactionFromTableModalProps = {
	open: boolean;
	handleClose: (value: boolean) => void;
	isEdit?: boolean;
	dataTable: Table;
};

const CreateTransactionFromTableModal = ({
	open,
	handleClose,
	isEdit,
	dataTable,
}: CreateTransactionFromTableModalProps) => {
	const {outletId} = useAppSelector(state => state.auth);
	const queryClient = useQueryClient();

	const methods = useForm({
		mode: 'onChange',
		schema: validationSchemaCreateTransactionFromTableView,
	});

	const {createTransaction, isLoading: loadCreateTransaction} =
		useCreateTransactionViewModel({
			onSuccess: () => {
				queryClient.invalidateQueries([GetTableLayoutByFloorQueryKey]);
				handleClose(false);
				methods.reset();
			},
		});

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaCreateTransactionFromTableViewType
	> = form => {
		createTransaction({
			...form,
			total_pax: Number(form.total_pax),
			restaurant_outlet_uuid: outletId,
			restaurant_outlet_table_uuid: dataTable.uuid,
		});
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: {errors, isValid},
	} = methods;

	// useEffect(() => {
	// 	if (isEdit) {
	// 		const {
	// 			total_pax,
	// 			customer_name,
	// 			transaction_category,
	// 			restaurant_outlet_table_uuid,
	// 		} = dataTransaction as Transaction;

	// 		const selectTransactionCategory =
	// 			orderTransactionType[transaction_category];

	// 		setValue('customer_name', customer_name);
	// 		setValue('total_pax', total_pax > 0 ? total_pax.toString() : undefined);
	// 		setValue('transaction_category', selectTransactionCategory);
	// 		setValue(
	// 			'restaurant_outlet_table_uuid',
	// 			restaurant_outlet_table_uuid?.toString() || '',
	// 		);
	// 	}
	// }, [dataTransaction, isEdit, setValue]);

	return (
		<Modal
			open={open}
			onCancel={() => handleClose(false)}
			closable={false}
			footer={
				<div className="grid grid-cols-2 gap-2 px-4 pb-4 pt-2">
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
						isLoading={loadCreateTransaction}
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
				<div className="grid grid-cols-2 gap-4 mt-4">
					<div>
						<p className="text-neutral-10 mb-1">Customer name (Optional)</p>
						<Input
							size="l"
							placeholder="Customer name (Optional)"
							{...register('customer_name')}
							error={!!errors.customer_name}
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
				</div>
			</div>
		</Modal>
	);
};

export default CreateTransactionFromTableModal;
