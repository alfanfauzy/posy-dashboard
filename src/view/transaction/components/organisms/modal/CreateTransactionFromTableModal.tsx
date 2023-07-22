import {GetAreasQueryKey} from '@/data/area/sources/GetAreasQuery';
import {GetTableLayoutByFloorQueryKey} from '@/data/table/sources/GetTableLayoutByFloorQuery';
import {GetTransactionQueryKey} from '@/data/transaction/sources/GetTransactionQuery';
import {QrCode} from '@/domain/qr-code/model';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeIsOpenEditTransactionFromTableView,
	onChangeSelectedTable,
	onChangeSelectedTrxId,
} from '@/view/common/store/slices/transaction';
import {
	validationSchemaCreateTransactionFromTableView,
	ValidationSchemaCreateTransactionFromTableViewType,
} from '@/view/transaction/schemas/create-transaction';
import {useCreateTransactionViewModel} from '@/view/transaction/view-models/CreateTransactionViewModel';
import {useGetTransactionViewModel} from '@/view/transaction/view-models/GetTransactionViewModel';
import {useUpdateTransactionViewModel} from '@/view/transaction/view-models/UpdateTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Modal} from 'antd';
import {Button, Input} from 'posy-fnb-core';
import React, {useEffect, useRef} from 'react';
import * as reactHookForm from 'react-hook-form';
import {useReactToPrint} from 'react-to-print';

import PrintQrCodeReceipt from '../receipt/PrintQrCodeReceipt';

type CreateTransactionFromTableModalProps = {
	isEdit?: boolean;
};

const CreateTransactionFromTableModal = ({
	isEdit,
}: CreateTransactionFromTableModalProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);
	const {
		prevTable,
		selectedTrxId,
		selectedTable,
		isOpenEditTransactionFromTableView,
	} = useAppSelector(state => state.transaction);

	const {
		register,
		handleSubmit,
		reset,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaCreateTransactionFromTableView,
	});

	const handleClose = () =>
		dispatch(onChangeIsOpenEditTransactionFromTableView(false));

	const onClose = () => {
		handleClose();
		reset({
			customer_name: '',
			total_pax: '',
		});

		if (prevTable) {
			dispatch(onChangeSelectedTable({table: prevTable, prevTable: null}));
		} else {
			dispatch(onChangeSelectedTable({table: null, prevTable: null}));
		}
	};

	const onCloseEdit = () => {
		handleClose();
	};

	useGetTransactionViewModel(
		{
			transaction_uuid: selectedTrxId,
		},
		{
			enabled: !!(isEdit && selectedTrxId),
			onSuccess: dt => {
				reset({
					customer_name: dt.data.customer_name,
					total_pax: dt.data.total_pax.toString(),
				});
			},
		},
	);

	const qrRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

	const handlePrint = useReactToPrint({
		content: () => qrRef.current,
	});

	const {
		data: dataQr,
		createTransaction,
		isLoading: loadCreateTransaction,
	} = useCreateTransactionViewModel({
		onSuccess: _dataQr => {
			const dt = _dataQr as QrCode;
			queryClient.invalidateQueries([GetTableLayoutByFloorQueryKey]);
			queryClient.invalidateQueries([GetAreasQueryKey]);
			onClose();
			setTimeout(() => {
				handlePrint();
			}, 100);
			dispatch(onChangeSelectedTrxId({id: dt.uuid}));
		},
	});

	const {updateTransaction, isLoading: loadUpdateTransaction} =
		useUpdateTransactionViewModel({
			onSuccess: () => {
				queryClient.invalidateQueries([GetTransactionQueryKey]);
				onCloseEdit();
			},
		});

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaCreateTransactionFromTableViewType
	> = form => {
		if (isEdit) {
			updateTransaction({
				...form,
				restaurant_outlet_uuid: outletId,
				restaurant_outlet_table_uuid: selectedTable?.uuid,
				transaction_uuid: selectedTrxId,
				transaction_category: {label: 'DINE_IN', value: 0},
			});
		} else {
			createTransaction({
				...form,
				total_pax: Number(form.total_pax),
				restaurant_outlet_uuid: outletId,
				restaurant_outlet_table_uuid: selectedTable?.uuid,
			});
		}
	};

	useEffect(() => {
		if (!isEdit) {
			reset({
				customer_name: '',
				total_pax: '',
			});
		}
	}, [isEdit, reset, isOpenEditTransactionFromTableView]);

	return (
		<>
			<Modal
				open={isOpenEditTransactionFromTableView}
				onCancel={onClose}
				closable={false}
				footer={
					<div className="grid grid-cols-2 gap-2 px-4 pb-4 pt-2">
						<Button
							type="button"
							variant="secondary"
							onClick={isEdit ? onCloseEdit : onClose}
						>
							Cancel
						</Button>
						<Button
							disabled={!isValid}
							type="submit"
							size="l"
							variant="primary"
							fullWidth
							isLoading={loadCreateTransaction || loadUpdateTransaction}
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
								error={!!errors.total_pax}
							/>
						</div>
					</div>
				</div>
			</Modal>
			{dataQr && <PrintQrCodeReceipt data={dataQr} printReceiptRef={qrRef} />}
		</>
	);
};

export default CreateTransactionFromTableModal;
