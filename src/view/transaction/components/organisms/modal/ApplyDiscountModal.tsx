/* eslint-disable react-hooks/exhaustive-deps */
import {GetPaymentSummaryQueryKey} from '@/data/transaction/sources/GetPaymentSummaryQuery';
import {ApplyDiscount} from '@/domain/transaction/repositories/CreateApplyDiscountRepository';
import InputNumeric from '@/view/common/components/atoms/input/numeric/InputNumeric';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {toRupiah} from '@/view/common/utils/common';
import {
	ValidationSchemaApplyDiscountType,
	validationSchemaApplyDiscount,
} from '@/view/transaction/schemas/apply-discount';
import {useCreateApplyDiscountViewModel} from '@/view/transaction/view-models/CreateApplyDiscountViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button, Input} from 'posy-fnb-core';
import React, {useEffect, useState} from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type ApplyDiscountModalProps = {
	isOpenApplyDiscount: boolean;
	closeApplyDiscount: () => void;
};

const ApplyDiscountModal = ({
	closeApplyDiscount,
	isOpenApplyDiscount,
}: ApplyDiscountModalProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedTrxId, payment} = useAppSelector(state => state.transaction);

	const [price] = useState(Number(payment.subtotal) || 0);

	const {
		register,
		formState: {isValid, errors},
		setValue,
		getValues,
		watch,
		handleSubmit,
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaApplyDiscount,
		defaultValues: {
			discount_price: '0',
		},
	});

	const {createApplyDiscount, isLoading} = useCreateApplyDiscountViewModel({
		onSuccess: _data => {
			const data = _data as ApplyDiscount;
			if (data) {
				queryClient.invalidateQueries([GetPaymentSummaryQueryKey]);
				closeApplyDiscount();
			}
		},
	});

	const onSubmit = (data: ValidationSchemaApplyDiscountType) => {
		console.log(data);
		// createApplyDiscount({
		// 	transaction_uuid: selectedTrxId,
		// 	restaurant_outlet_uuid: outletId,
		// 	...data,
		// });
	};

	useEffect(() => {
		setValue('discount_percentage', payment.discount_percentage.toString());
		const discountPrice = (Number(payment.discount_percentage) * price) / 100;
		setValue('discount_price', discountPrice.toString());
	}, [payment.discount_percentage]);

	return (
		<Modal
			closeOverlay
			open={isOpenApplyDiscount}
			handleClose={closeApplyDiscount}
			className="min-w-[340px] p-8"
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<aside>
					<p className="mb-2 text-l-semibold">Discount</p>
					<Input labelText="Price" disabled value={toRupiah(price)} />
					<div className="mt-2 flex gap-4">
						<div className="w-2/5">
							<Input
								placeholder="10"
								{...register('discount_percentage', {
									onChange: e => {
										setValue(
											'discount_percentage',
											e.target.value.replace(/\D/, ''),
										);
										const discountPrice =
											(price * Number(getValues('discount_percentage'))) / 100;

										setValue('discount_price', discountPrice.toString());
									},
								})}
								labelText="Discount (%)"
								error={!!errors.discount_percentage}
								helperText={errors.discount_percentage?.message}
								endAdornment={<p>%</p>}
							/>
						</div>
						<div className="w-3/5">
							<InputNumeric
								fullwidth
								labelText="Discount (Rp)"
								placeholder="0"
								disabled
								value={watch('discount_price')}
								{...register('discount_price')}
							/>
						</div>
					</div>
				</aside>

				<div className="mt-10 flex items-center justify-center gap-4">
					<Button
						variant="secondary"
						className="w-1/2"
						onClick={closeApplyDiscount}
					>
						Close
					</Button>
					<Button
						type="submit"
						className="w-1/2"
						disabled={!isValid}
						isLoading={isLoading}
					>
						Apply
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ApplyDiscountModal;
