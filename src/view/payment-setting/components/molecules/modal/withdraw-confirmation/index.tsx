import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {toRupiah} from '@/view/common/utils/common';
import {Modal} from 'antd';
import {Button} from 'posy-fnb-core';
import React, {useContext} from 'react';

const WithdrawConfirmationMolecules = () => {
	const {
		bankAccountData,
		isOpenWithdrawConfirmation,
		handleIsOpenWithdrawConfirmation,
		payloadWithdraw,
		handleIsOpenPasswordConfirmation,
		setConfirmationType,
	} = useContext(PaymentSettingContext);

	const withdrawFee = 5000;
	const withdrawVAT = (11 / 100) * 5000;
	const ammountReceived = payloadWithdraw.amount - (withdrawFee + withdrawVAT);

	return (
		<Modal
			maskClosable={false}
			open={isOpenWithdrawConfirmation}
			onCancel={handleIsOpenWithdrawConfirmation}
			title={
				<h1 className="text-xl-semibold border-b border-neutral-40 p-4">
					Withdraw Confirmation
				</h1>
			}
			footer={
				<div className="p-4">
					<Button
						fullWidth
						onClick={() => {
							handleIsOpenPasswordConfirmation();
							handleIsOpenWithdrawConfirmation();
							setConfirmationType('withdraw');
						}}
					>
						Withdraw
					</Button>
				</div>
			}
		>
			<div className="px-4 flex flex-col gap-3">
				<section className="flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-md">
					<h2 className="text-m-bold">Receiver ID</h2>
					<div className="flex flex-row justify-between">
						<label className="text-m-regular">Bank Name</label>
						<label className="text-m-semibold">
							{bankAccountData?.bank_name}
						</label>
					</div>
					<div className="flex flex-row justify-between">
						<label className="text-m-regular">Account Number</label>
						<label className="text-m-semibold">
							{bankAccountData?.account_number}
						</label>
					</div>
					<div className="flex flex-row justify-between">
						<label className="text-m-regular">Bank account name</label>
						<label className="text-m-semibold">
							{bankAccountData?.account_name}
						</label>
					</div>
					<div className="flex flex-row justify-between">
						<label className="text-m-regular">Email Notification</label>
						<label className="text-m-semibold">{bankAccountData?.email}</label>
					</div>
				</section>
				<section className="flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-md">
					<h2 className="text-m-bold">Withdrawal details</h2>
					<div className="flex flex-row justify-between">
						<label className="text-m-regular">Withdrawal amount</label>
						<label className="text-m-semibold">
							{toRupiah(payloadWithdraw.amount)}
						</label>
					</div>
					<div className="flex flex-row justify-between">
						<label className="text-m-regular">Withdrawal fee</label>
						<label className="text-m-semibold">-{toRupiah(withdrawFee)}</label>
					</div>
					<div className="flex flex-row justify-between">
						<label className="text-m-regular">Withdrawal VAT</label>
						<label className="text-m-semibold">-{toRupiah(withdrawVAT)}</label>
					</div>
					<div className="flex flex-row justify-between">
						<label className="text-m-bold">Amount received</label>
						<label className="text-l-bold">{toRupiah(ammountReceived)}</label>
					</div>
				</section>
			</div>
		</Modal>
	);
};

export default WithdrawConfirmationMolecules;
