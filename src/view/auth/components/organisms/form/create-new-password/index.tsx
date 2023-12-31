import {ResetPassword} from '@/domain/auth/repositories/ResetPasswordRepository';
import {
	validationSchemaCreateNewPassword,
	ValidationSchemaCreateNewPasswordType,
} from '@/view/auth/schemas';
import {useResetPasswordViewModel} from '@/view/auth/view-models/ResetPasswordViewModel';
import Logo from '@/view/common/components/atoms/logo';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useForm} from '@/view/common/hooks/useForm';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {useRouter} from 'next/router';
import {Button, Input} from 'posy-fnb-core';
import React, {useEffect} from 'react';
import * as reactHookForm from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

const OrganismsFormCreateNewPassword = () => {
	const router = useRouter();
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
		onSuccess: _data => {
			const data = _data as ResetPassword;
			if (data.success) {
				setTimeout(() => {
					router.push('/auth/login');
				}, 1500);
				logEvent({
					category: 'forgot_password',
					action: 'forgotPassword_successMessage_view',
				});
			}
		},
		onError: () => {
			logEvent({
				category: 'forgot_password',
				action: 'forgotPassword_createPassword_failed',
			});
		},
	});

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaCreateNewPasswordType
	> = form => {
		resetPassword({
			...form,
			token: router.query.token as string,
		});
		logEvent({
			category: 'forgot_password',
			action: 'forgotPassword_createPassword_submit',
		});
	};

	useEffect(() => {
		logEvent({
			category: 'forgot_password',
			action: 'forgotPassword_createPassword_view',
		});
	}, []);

	return (
		<article className="flex h-full flex-col items-center justify-center overflow-y-auto p-14 lg:p-16 xl:p-24">
			<Logo />
			<form
				className="mt-10 w-full max-w-md rounded-3xl p-10 shadow-basic"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<p className="text-xxl-semibold text-neutral-100">
						Create a strong password
					</p>
					<p className="mt-6 text-l-regular text-primary-main">
						Password must be at least 8 Characters, 1 Uppercase and 1 Lowercase.
					</p>
				</div>
				<div className="mt-6 flex flex-col gap-4">
					<Input
						type={showPassword ? 'text' : 'password'}
						labelText="New Password"
						placeholder="Input password"
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
						placeholder="Input password"
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
