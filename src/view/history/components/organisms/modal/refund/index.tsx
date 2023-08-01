import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {Transaction} from '@/domain/transaction/model';
import {RefundTransaction} from '@/domain/transaction/repositories/CreateRefundTransactionRepository';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {
	ValidationSchemaRefundType,
	validationSchemaRefund,
} from '@/view/history/schemas/RefundSchema';
import {useGetOutletUserViewModel} from '@/view/outlet/view-models/GetOutletUserViewModel';
import {useCreateRefundTransactionViewModel} from '@/view/transaction/view-models/CreateRefundTransactionViewModel';
import {useGetTransactionViewModel} from '@/view/transaction/view-models/GetTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button, Input, Select, Textarea} from 'posy-fnb-core';
import React from 'react';
import {Controller} from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

const Modal = dynamic(
	() => import('posy-fnb-core').then(module => module.Modal),
	{
		loading: () => <div />,
	},
);

type RefundModalProps = {
	isOpen: boolean;
	close: () => void;
	valueRefund: Transaction;
};

const RefundModal = ({close, isOpen, valueRefund}: RefundModalProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);
	const [showPassword, {toggle}] = useDisclosure({initialState: false});

	const {data: dataTransaction, isLoading: loadDataTransaction} =
		useGetTransactionViewModel(
			{
				transaction_uuid: valueRefund && valueRefund?.uuid,
			},
			{
				enabled: !!valueRefund,
			},
		);

	const {data: dataOutletUser, isLoading: loadOutletUser} =
		useGetOutletUserViewModel(
			{
				restaurant_outlet_uuid: outletId,
			},
			{
				enabled: !!outletId,
			},
		);

	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
		control,
	} = useForm({mode: 'onChange', schema: validationSchemaRefund});

	const {createRefundTransaction, isLoading: loadRefund} =
		useCreateRefundTransactionViewModel({
			onSuccess: _data => {
				const data = _data as RefundTransaction;
				if (data) {
					queryClient.invalidateQueries([GetTransactionsQueryKey]);
					close();
				}
			},
		});

	const onSubmit = (data: ValidationSchemaRefundType) => {
		createRefundTransaction({
			...data,
			transaction_uuid: valueRefund.uuid,
			restaurant_outlet_uuid: valueRefund.restaurant_outlet_uuid,
		});
		logEvent({
			category: 'refund',
			action: 'refund_refund_click',
		});
	};

	return (
		<Modal
			isForm
			handleSubmit={handleSubmit(onSubmit)}
			className="!p-0 lg:min-w-[700px]"
			isLoading={loadDataTransaction}
			open={isOpen}
			handleClose={close}
			confirmButton={
				<div className="mx-4 flex w-full items-center justify-center gap-4">
					<Button variant="secondary" onClick={close} fullWidth>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={!isValid}
						isLoading={loadRefund}
						variant="primary"
						fullWidth
					>
						Refund
					</Button>
				</div>
			}
		>
			{dataTransaction && (
				<section className="px-10 pt-10 pb-6 text-primary-main">
					<aside className="flex items-center justify-between gap-4 border-b border-neutral-40 pb-4">
						<div className="flex-1">
							<p className="text-xxl-bold">Refund Details</p>
							<p className="text-xl-regular">
								ID: {dataTransaction.transaction_code}
							</p>
						</div>
						<div className="flex gap-5 text-xl-regular">
							<div className="border-r border-neutral-40 pr-4">
								<p>{dataTransaction.customer_name || '-'}</p>
							</div>
							<div className="border-r border-neutral-40 pr-4">
								<p>{`Table ${dataTransaction.table_number || '-'}`}</p>
							</div>
							<div>
								<p>{`Pax ${dataTransaction.total_pax}`}</p>
							</div>
						</div>
					</aside>

					<aside className="mt-4 flex w-full gap-4">
						<div className="w-1/2">
							{dataOutletUser && (
								<Controller
									name="authorization_user_uuid"
									control={control}
									render={({field: {onChange}}) => (
										<Select
											className="w-1/2 bg-slate-400"
											options={dataOutletUser?.map(el => ({
												label: el.full_name,
												value: el.uuid,
											}))}
											isLoading={loadOutletUser}
											disabled={loadOutletUser}
											onChange={onChange}
											labelText="Authorization by"
											placeholder="Enter a authorization name"
											error={!!errors?.authorization_user_uuid}
											helperText={errors?.authorization_user_uuid?.message}
										/>
									)}
								/>
							)}
						</div>
						<div className="w-1/2">
							<Input
								type={showPassword ? 'text' : 'password'}
								labelText="Approver password"
								placeholder="Input password"
								endAdornment={
									showPassword ? (
										<AiOutlineEyeInvisible onClick={toggle} />
									) : (
										<AiOutlineEye onClick={toggle} />
									)
								}
								{...register('authorization_credential')}
								error={!!errors?.authorization_credential}
								helperText={errors?.authorization_credential?.message}
							/>
						</div>
					</aside>
					<aside className="mt-4">
						<Textarea
							labelText="Notes"
							className="mt-2 h-32"
							placeholder="Wrong order fried rice"
							{...register('refund_notes')}
							error={!!errors?.refund_notes}
							helperText={errors?.refund_notes?.message}
						/>
					</aside>
				</section>
			)}
		</Modal>
	);
};

export default RefundModal;
