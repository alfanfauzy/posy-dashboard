import Logo from '@/atoms/logo';
import useDisclosure from '@/hooks/useDisclosure';
import {useForm} from '@/hooks/useForm';
import {useRouter} from 'next/router';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import * as reactHookForm from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {
	validationSchemaCreateNewPassword,
	ValidationSchemaCreateNewPasswordType,
} from 'src/schemas/auth';

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
		formState: {errors},
	} = useForm({
		schema: validationSchemaCreateNewPassword,
	});

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaCreateNewPasswordType
	> = () => {
		router.push('verify-account');
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
						{...register('confirmPassword')}
						error={!!errors?.confirmPassword}
						helperText={errors?.confirmPassword?.message}
					/>
				</div>
				<Button
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
