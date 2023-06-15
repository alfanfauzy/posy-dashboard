import {mapToPayloadSaveBankAccount} from '@/data/bank/mappers/BankMapper';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/BankRepository';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {PaymentBankAccountForm} from '@/view/payment-setting/schemas/payment/setting';
import {Modal} from 'antd';
import {Button, Input} from 'posy-fnb-core';
import React, {useContext, useState} from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

const PasswordConfirmationOrganism = () => {
	const {
		isOpenPasswordConfirmation,
		handleIsOpenPasswordConfirmation,
		payloadEditInformation,
		payloadWithdraw,
		confirmationType,
		saveBankAccount,
		isLoadingSaveBankAccount,
		createPaymentWithdraw,
		isLoadingPaymentWithdraw,
	} = useContext(PaymentSettingContext);

	const [showPassword, {toggle}] = useDisclosure({initialState: false});
	const [valuePassword, setPassword] = useState('');
	const [isEmptyPassword, setIsEmptyPassword] = useState(false);

	const handleSubmit = () => {
		if (valuePassword === '') return setIsEmptyPassword(true);

		const newPayloadSaveBankAccount = mapToPayloadSaveBankAccount(
			payloadEditInformation as PaymentBankAccountForm,
			valuePassword,
		);

		const newPayloadWithdraw = {
			...payloadWithdraw,
			password: valuePassword,
		};

		switch (confirmationType) {
			case 'edit-information':
				saveBankAccount(newPayloadSaveBankAccount as PayloadSaveBankAccount);
				break;

			default:
				createPaymentWithdraw(newPayloadWithdraw);
				break;
		}

		setIsEmptyPassword(false);
	};

	return (
		<Modal
			maskClosable={false}
			open={isOpenPasswordConfirmation}
			onCancel={handleIsOpenPasswordConfirmation}
			title={
				<h1 className="text-xl-semibold border-b border-neutral-40 p-4">
					Input Password
				</h1>
			}
			footer={
				<div className="p-4">
					<Button
						onClick={handleSubmit}
						fullWidth
						isLoading={isLoadingSaveBankAccount || isLoadingPaymentWithdraw}
					>
						Submit
					</Button>
				</div>
			}
		>
			<div className="px-4">
				<Input
					type={showPassword ? 'text' : 'password'}
					labelText="Password"
					placeholder="Input password"
					onChange={e => {
						if (e.target.value.length !== 0) {
							setIsEmptyPassword(false);
						}
						setPassword(e.target.value);
					}}
					endAdornment={
						showPassword ? (
							<AiOutlineEyeInvisible onClick={toggle} />
						) : (
							<AiOutlineEye onClick={toggle} />
						)
					}
					error={isEmptyPassword}
					helperText={
						isEmptyPassword ? 'Please input the password field' : undefined
					}
				/>
			</div>
		</Modal>
	);
};

export default PasswordConfirmationOrganism;
