import useDisclosure from '@/view/common/hooks/useDisclosure';
import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {WithdrawForm} from '@/view/payment-setting/schemas/withdraw';
import {Modal} from 'antd';
import {Button, Input} from 'posy-fnb-core';
import React, {useContext, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

const PasswordConfirmationOrganism = () => {
	const {
		isOpenPasswordConfirmation,
		handleIsOpenPasswordConfirmation,
		isLoadingSaveBankAccount,
		createPaymentWithdraw,
		isLoadingPaymentWithdraw,
	} = useContext(PaymentSettingContext);

	const methodsWithdraw = useFormContext<WithdrawForm>();

	const {
		register,
		setValue,
		formState: {errors},
		trigger,
		getValues,
		resetField,
		unregister,
		watch,
	} = methodsWithdraw;

	useEffect(() => {
		unregister('password');
	}, []);

	const [showPassword, {toggle}] = useDisclosure({initialState: false});

	const handleCloseModal = () => {
		handleIsOpenPasswordConfirmation();
		resetField('amount');
		resetField('password');
	};

	const handleSubmit = () => {
		// const newPayloadSaveBankAccount = mapToPayloadSaveBankAccount(
		// 	payloadEditInformation as PaymentBankAccountForm,
		// 	getValuesBankAccount('password') as string,
		// );

		const newPayloadWithdraw = {
			amount: parseInt(getValues('amount')),
			password: getValues('password'),
		};

		createPaymentWithdraw(newPayloadWithdraw);
		// switch (confirmationType) {
		// 	case 'edit-information':
		// 		saveBankAccount(newPayloadSaveBankAccount as PayloadSaveBankAccount);
		// 		break;

		// 	default:
		// 		break;
		// }
	};

	const disabled =
		Object.keys(errors).length !== 0 || getValues('password') === undefined;

	return (
		<Modal
			maskClosable={false}
			open={isOpenPasswordConfirmation}
			onCancel={handleCloseModal}
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
						setValue('password', e.target.value);
						trigger();
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

export default PasswordConfirmationOrganism;
