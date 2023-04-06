import Logo from '@/atoms/logo';
import useDisclosure from '@/hooks/useDisclosure';
import {useForm} from '@/hooks/useForm';
import {
	validationSchemaCreateNewPassword,
	ValidationSchemaCreateNewPasswordType,
} from '@/view/auth/schemas';
import {useResetPasswordViewModel} from '@/view/auth/view-models/ResetPasswordViewModel';
import {useRouter} from 'next/router';
import {useSnackbar} from 'notistack';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import * as reactHookForm from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

const OrganismsFormCreateNewPassword = () => {
	const router = useRouter();
	const {enqueueSnackbar} = useSnackbar();
	const [showPassword, {toggle: toggleShowPassword}] = useDisclosure({
		initialState: false,
	});
	const [showConfirmPassword, {toggle: toggleShowConfirmPassword}] =
		useDisclosure({initialState: false});

	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaCreateNewPassword,
	});

	const {resetPassword, isLoading} = useResetPasswordViewModel({
		onSuccess: data => {
			if (data.data.success) {
				enqueueSnackbar({
					message: 'Password has been reset',
					variant: 'success',
				});
				setTimeout(() => {
					router.push('/login');
				}, 1500);
			}
		},
	});

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaCreateNewPasswordType
	> = form => {
		resetPassword({
			...form,
			token: router.query.token as string,
		});
	};

	return (
		<article className="flex h-full flex-col items-center justify-center overflow-y-auto p-14 lg:p-16 xl:p-24">
			<Logo />
			<form
				className="mt-10 w-full max-w-md rounded-3xl p-10 shadow-basic"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<p className="text-xxl-semibold text-primary-main">
						Create a strong password
					</p>
					<p className="mt-6 text-l-regular text-primary-main">
						Your password must be at least 6 characters and should include a
						combination of numbers, letters and special characters (!$@%).
					</p>
				</div>
				<div className="mt-6 flex flex-col gap-4">
					<Input
						type={showPassword ? 'text' : 'password'}
						labelText="New Password"
						placeholder="Input Password"
						endAdornment={
							showPassword ? (
								<AiOutlineEyeInvisible onClick={toggleShowPassword} />
							) : (
								<AiOutlineEye onClick={toggleShowPassword} />
							)
						}
						{...register('password')}
						error={!!errors?.password}
						helperText={errors?.password?.message}
					/>
					<Input
						type={showConfirmPassword ? 'text' : 'password'}
						labelText="Confirm Password"
						placeholder="Input Password"
						endAdornment={
							showConfirmPassword ? (
								<AiOutlineEyeInvisible onClick={toggleShowConfirmPassword} />
							) : (
								<AiOutlineEye onClick={toggleShowConfirmPassword} />
							)
						}
						{...register('confirm_password')}
						error={!!errors?.confirm_password}
						helperText={errors?.confirm_password?.message}
					/>
				</div>
				<Button
					disabled={!isValid}
					isLoading={isLoading}
					variant="primary"
					size="l"
					fullWidth
					className="mt-6"
					type="submit"
				>
					Reset Password
				</Button>
			</form>
		</article>
	);
};

export default OrganismsFormCreateNewPassword;
