import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {toRupiah} from '@/view/common/utils/common';
import {WithdrawForm} from '@/view/payment-setting/schemas/withdraw';
import {Modal} from 'antd';
import {Button} from 'posy-fnb-core';
import React, {useContext, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {NumericFormat} from 'react-number-format';

const FormWithdrawOrganism = () => {
	const {
		paymentBalanceData = {cash: 0},
		isOpenFormWithdraw,
		handleIsOpenFormWithdraw,
		handleIsOpenWithdrawConfirmation,
		setPayloadWithdraw,
	} = useContext(PaymentSettingContext);

	const [price, setPrice] = useState(0);

	const methods = useFormContext<WithdrawForm>();

	const {
		control,
		setValue,
		setError,
		formState: {errors},
		trigger,
		resetField,
		getValues,
	} = methods;

	const handleCloseModal = () => {
		setPrice(0);
		handleIsOpenFormWithdraw();
		resetField('amount');
		resetField('password');
	};

	const handleSubmitWithdraw = () => {
		if (!errors.amount) {
			setPayloadWithdraw({amount: price});
			handleIsOpenWithdrawConfirmation();
			setPrice(0);
			handleIsOpenFormWithdraw();
		}
	};

	const handleChangeInput = (input: {
		floatValue: number;
		formattedValue: string;
		value: string;
	}) => {
		const {floatValue, value} = input;

		if (floatValue > paymentBalanceData.cash && floatValue <= 10000000) {
			setError('amount', {message: 'Insufficient balance'});
			return;
		}

		setValue('amount', value);
		setPrice(floatValue);
		trigger();
	};

	const isDisabledButton = !!errors.amount || getValues('amount') === undefined;

	return (
		<Modal
			maskClosable={false}
			open={isOpenFormWithdraw}
			onCancel={handleCloseModal}
			title={
				<h1 className="text-xl-semibold border-b border-neutral-40 p-4">
					Withdraw
				</h1>
			}
			footer={
				<div className="p-4">
					<Button
						onClick={handleSubmitWithdraw}
						fullWidth
						disabled={isDisabledButton}
					>
						Submit
					</Button>
				</div>
			}
		>
			<div className="px-4">
				<section className="flex flex-col gap-2">
					<label className="text-m-bold">Balance</label>
					<label className="text-l-bold">
						{toRupiah(paymentBalanceData?.cash as number)}
					</label>
				</section>
				<section className="flex flex-col gap-1 mt-4">
					<label className="text-m-reguler">Enter amount to withdraw</label>

					<Controller
						name="amount"
						control={control}
						render={({field: {name}}) => (
							<NumericFormat
								className="flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 px-4 py-2.5 text-center transition-all duration-300 ease-in-out focus:outline-none"
								name={name}
								thousandSeparator="."
								decimalSeparator=","
								prefix="Rp "
								onValueChange={(e: any) => handleChangeInput(e)}
								allowNegative={false}
								value={price}
							/>
						)}
					/>

					{errors.amount && (
						<p className="text-red-accent">{errors.amount.message}</p>
					)}
				</section>
			</div>
		</Modal>
	);
};

export default FormWithdrawOrganism;
