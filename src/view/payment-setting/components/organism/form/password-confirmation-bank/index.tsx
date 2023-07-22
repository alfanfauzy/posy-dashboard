import {mapToPayloadSaveBankAccount} from '@/data/bank/mappers/BankMapper';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/CreateSaveBankRepository';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {PaymentBankAccountForm} from '@/view/payment-setting/schemas/payment/setting';
import {Modal} from 'antd';
import {Button, Input} from 'posy-fnb-core';
import React, {useContext} from 'react';
import {useFormContext} from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

const PasswordConfirmationBankOrganism = () => {
	const {
		isOpenPasswordConfirmationBank,
		handleIsOpenPasswordConfirmationBank,
		isLoadingSaveBankAccount,
		saveBankAccount,
		isLoadingPaymentWithdraw,
		payloadEditInformation,
	} = useContext(PaymentSettingContext);

	const methodsWithdraw = useFormContext<PaymentBankAccountForm>();

	const {
		register,
		setValue,
		formState: {errors},
		getValues,
		resetField,
	} = methodsWithdraw;

	const [showPassword, {toggle}] = useDisclosure({initialState: false});

	const handleCloseModal = () => {
		handleIsOpenPasswordConfirmationBank();
		resetField('password');
	};

	const handleSubmit = () => {
		const newPayloadSaveBankAccount = mapToPayloadSaveBankAccount(
			payloadEditInformation as PaymentBankAccountForm,
			getValues('password') as string,
		);

		saveBankAccount(newPayloadSaveBankAccount as PayloadSaveBankAccount);
	};

	const disabled =
		getValues('password') === undefined || getValues('password') === '';

	return (
		<Modal
			maskClosable={false}
			open={isOpenPasswordConfirmationBank}
			onCancel={handleCloseModal}
			title={
				<h1 className="text-xl-semibold border-b border-neutral-40 p-4">
					Input password bank
				</h1>
			}
			footer={
				<div className="p-4">
					<Button
						onClick={handleSubmit}
						fullWidth
						isLoading={isLoadingSaveBankAccount || isLoadingPaymentWithdraw}
						disabled={disabled}
					>
						Submit
					</Button>
				</div>
			}
		>
			<div className="px-4">
				<Input
					{...register('password')}
					type={showPassword ? 'text' : 'password'}
					labelText="Password"
					placeholder="Input password"
					onChange={e => {
						setValue('password', e.target.value, {shouldValidate: true});
					}}
					endAdornment={
						showPassword ? (
							<AiOutlineEyeInvisible onClick={toggle} />
						) : (
							<AiOutlineEye onClick={toggle} />
						)
					}
					error={!!errors?.password}
					helperText={errors?.password?.message}
				/>
			</div>
		</Modal>
	);
};

export default PasswordConfirmationBankOrganism;
