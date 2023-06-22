import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {toRupiah} from '@/view/common/utils/common';
import {Modal} from 'antd';
import {Button} from 'posy-fnb-core';
import React, {useContext, useState} from 'react';
import {NumericFormat} from 'react-number-format';

const ERROR_MESSAGE = {
	minimum: 'Minimum withdraw is Rp10.000',
	insufficient: 'Insufficient balance',
	maximum: 'Maximum withdraw is Rp10.000.000',
};

const FormWithdrawOrganism = () => {
	const {
		paymentBalanceData = {cash: 0},
		isOpenFormWithdraw,
		handleIsOpenFormWithdraw,
		handleIsOpenWithdrawConfirmation,
		setPayloadWithdraw,
	} = useContext(PaymentSettingContext);

	const [price, setPrice] = useState(0);
	const [errorInput, setErrorInput] = useState(false);
	const [messageError, setMessageError] = useState('');

	const handleSubmit = () => {
		setPayloadWithdraw({amount: price});
		handleIsOpenWithdrawConfirmation();
		handleIsOpenFormWithdraw();
	};

	const handleChangeInput = (input: {
		floatValue: number;
		formattedValue: string;
		value: string;
	}) => {
		const {floatValue, value} = input;
		const valueAsNumber = parseInt(value);

		if (valueAsNumber < 10000) {
			setErrorInput(true);
			setMessageError(ERROR_MESSAGE['minimum']);
			setPrice(floatValue);
			return;
		} else if (valueAsNumber > 10000000) {
			setErrorInput(true);
			setMessageError(ERROR_MESSAGE['maximum']);
			setPrice(floatValue);
			return;
		} else if (valueAsNumber > paymentBalanceData.cash) {
			setErrorInput(true);
			setMessageError(ERROR_MESSAGE['insufficient']);
			setPrice(floatValue);
			return;
		}

		setPrice(floatValue);
		setErrorInput(false);
	};

	const isDisabledButton = price === 0 || price === undefined || errorInput;

	return (
		<Modal
			maskClosable={false}
			open={isOpenFormWithdraw}
			onCancel={handleIsOpenFormWithdraw}
			title={
				<h1 className="text-xl-semibold border-b border-neutral-40 p-4">
					Withdraw
				</h1>
			}
			footer={
				<div className="p-4">
					<Button onClick={handleSubmit} fullWidth disabled={isDisabledButton}>
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
					<NumericFormat
						className="flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 px-4 py-2.5 text-center transition-all duration-300 ease-in-out focus:outline-none"
						thousandSeparator="."
						decimalSeparator=","
						prefix="Rp "
						onValueChange={(e: any) => handleChangeInput(e)}
						allowNegative={false}
						value={price}
					/>
					{errorInput && <p className="text-red-accent">{messageError}</p>}
				</section>
			</div>
		</Modal>
	);
};

export default FormWithdrawOrganism;
