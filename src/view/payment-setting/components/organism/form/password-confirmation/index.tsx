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
		const newPayloadWithdraw = {
			amount: parseInt(getValues('amount')),
			password: getValues('password'),
		};

		createPaymentWithdraw(newPayloadWithdraw);
	};

	const disabled =
		Object.keys(errors).length !== 0 || getValues('password') === undefined;

	console.log(watch());
	console.log(errors);

	return (
		<Modal
			maskClosable={false}
			open={isOpenPasswordConfirmation}
			onCancel={!isLoadingPaymentWithdraw ? handleCloseModal : undefined}
			title={
				<h1 className="text-xl-semibold border-b border-neutral-40 p-4">
					Input password
				</h1>
			}
			footer={
				<div className="p-4">
					<Button
						onClick={handleSubmit}
						fullWidth
						isLoading={isLoadingPaymentWithdraw}
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
