import Logo from '@/atoms/logo';
import {mapToLoginModel} from '@/data/auth/mappers/LoginMapper';
import useDisclosure from '@/hooks/useDisclosure';
import {useForm} from '@/hooks/useForm';
import {useAppDispatch} from '@/store/hooks';
import {onLoginSuccess} from '@/store/slices/auth';
import {
	validationSchemaLogin,
	ValidationSchemaLoginType,
} from '@/view/auth/schemas';
import {useLoginViewModel} from '@/view/auth/view-models/LoginViewModel';
import {useRouter} from 'next/router';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import * as reactHookForm from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';

const OrganismsFormLogin = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [showPassword, {toggle}] = useDisclosure({initialState: false});

	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
		setValue,
		setError,
	} = useForm({
		schema: validationSchemaLogin,
	});

	const {login, isLoading: loadLogin} = useLoginViewModel({
		onSuccess: data => {
			if (data?.data) {
				dispatch(onLoginSuccess(mapToLoginModel(data?.data)));
				router.push('/transaction');
			}
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (e: any) => {
			if (e?.response?.data?.message === 'User not found') {
				setValue('email', '');
				setError(
					'email',
					{message: e?.response?.data?.more_info},
					{
						shouldFocus: true,
					},
				);
			} else {
				setValue('password', '');
				setError(
					'password',
					{message: e?.response?.data?.more_info},
					{
						shouldFocus: true,
					},
				);
			}
		},
	});

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaLoginType
	> = form => {
		login(form);
	};

	return (
		<article className="flex h-full flex-col items-center justify-center overflow-y-auto p-14 lg:p-16 xl:p-24">
			<Logo />
			<form
				className="mt-10 w-full rounded-3xl p-10 shadow-basic"
				onSubmit={handleSubmit(onSubmit)}
			>
				<p className="text-xxl-semibold">Hello, Welcome back!</p>
				<div className="mt-4 flex flex-col gap-4">
					<Input
						type="text"
						labelText="Email Address"
						placeholder="Enter a valid email"
						error={!!errors?.email}
						helperText={errors?.email?.message}
						{...register('email')}
					/>
					<Input
						type={showPassword ? 'text' : 'password'}
						labelText="Password"
						placeholder="Input Password"
						endAdornment={
							showPassword ? (
								<AiOutlineEyeInvisible onClick={toggle} />
							) : (
								<AiOutlineEye onClick={toggle} />
							)
						}
						{...register('password')}
						error={!!errors?.password}
						helperText={errors?.password?.message}
					/>
					<p
						role="presentation"
						onClick={() => router.push('forget-password')}
						className="cursor-pointer self-end text-m-semibold text-primary-main hover:text-opacity-75"
					>
						Forgot password
					</p>
				</div>
				<Button
					isLoading={loadLogin}
					disabled={!isValid}
					variant="primary"
					size="l"
					fullWidth
					className="mt-6"
					type="submit"
				>
					Login
				</Button>
			</form>
		</article>
	);
};

export default OrganismsFormLogin;
