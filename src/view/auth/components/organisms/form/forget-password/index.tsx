import {
	RequestResetPassword,
	RequestResetPasswordInput,
} from '@/domain/auth/repositories/RequestResetPasswordRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {
	validationSchemaForgetPassword,
	ValidationSchemaForgetPasswordType,
} from '@/view/auth/schemas';
import {useRequestResetPasswordViewModel} from '@/view/auth/view-models/RequestResetPasswordViewModel';
import Logo from '@/view/common/components/atoms/logo';
import {useForm} from '@/view/common/hooks/useForm';
import {useRouter} from 'next/router';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import * as reactHookForm from 'react-hook-form';

const OrganismsFormForgetPassword = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaForgetPassword,
	});

	const {requestResetPassword, isLoading} = useRequestResetPasswordViewModel({
		onSuccess: (_data, _variables) => {
			const data = _data as RequestResetPassword;
			const variables = _variables as RequestResetPasswordInput;
			if (data.success) router.push(`verify-account?email=${variables.email}`);
		},
		onError: _error => {
			const error = _error as BaseError;
			if (error?.isUnknown()) {
				setValue('email', '');
				setError(
					'email',
					{message: error.message},
					{
						shouldFocus: true,
					},
				);
			}
		},
	});

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaForgetPasswordType
	> = form => {
		requestResetPassword(form);
	};

	return (
		<article className="flex h-full flex-col items-center justify-center overflow-y-auto p-14 lg:p-16 xl:p-24">
			<Logo />
			<form
				className="mt-10 w-full rounded-3xl p-10 shadow-basic"
				onSubmit={handleSubmit(onSubmit)}
			>
				<p className="text-xxl-semibold text-primary-main">
					Enter your email address
				</p>
				<div className="mt-4 flex flex-col gap-4">
					<Input
						type="text"
						labelText="Email Address"
						placeholder="Enter a valid email"
						error={!!errors?.email}
						helperText={errors?.email?.message}
						{...register('email')}
					/>
					<p
						role="presentation"
						onClick={() => router.push('login')}
						className="cursor-pointer self-end text-m-semibold text-primary-main hover:text-opacity-75"
					>
						Back to login
					</p>
				</div>
				<Button
					isLoading={isLoading}
					disabled={!isValid}
					variant="primary"
					size="l"
					fullWidth
					className="mt-6"
					type="submit"
				>
					Send login link
				</Button>
			</form>
		</article>
	);
};

export default OrganismsFormForgetPassword;
