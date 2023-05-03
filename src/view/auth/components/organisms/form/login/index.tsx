import {Login} from '@/domain/auth/model';
import {BaseError} from '@/domain/vo/BaseError';
import {
	validationSchemaLogin,
	ValidationSchemaLoginType,
} from '@/view/auth/schemas';
import {useLoginViewModel} from '@/view/auth/view-models/LoginViewModel';
import Logo from '@/view/common/components/atoms/logo';
import {whatsapp} from '@/view/common/constants/contact';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppDispatch} from '@/view/common/store/hooks';
import {onLoginSuccess} from '@/view/common/store/slices/auth';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';
import * as reactHookForm from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {IoIosAlert} from 'react-icons/io';

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
	} = useForm({mode: 'onChange', schema: validationSchemaLogin});

	const {login, isLoading: loadLogin} = useLoginViewModel({
		onSuccess: _data => {
			const data = _data as Login;
			if (data) {
				dispatch(onLoginSuccess(data));
				router.push('/transaction');
			}
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
			} else {
				setValue('password', '');
				setError(
					'password',
					{message: error.message},
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
		<article className="flex h-full flex-col items-center justify-center overflow-y-hidden p-14 lg:p-16 xl:p-24">
			<Logo />
			<section className="mt-10 w-full rounded-3xl p-10 shadow-basic">
				<form onSubmit={handleSubmit(onSubmit)}>
					<p className="text-xxl-semibold">Hello, Welcome back!</p>
					<div className="mt-4 flex flex-col gap-4">
						<Input
							type="text"
							labelText="Email address"
							placeholder="Enter a valid email"
							error={!!errors?.email}
							helperText={errors?.email?.message}
							{...register('email')}
							endAdornment={
								errors.email && <IoIosAlert className="text-error" />
							}
						/>
						<Input
							type={showPassword ? 'text' : 'password'}
							labelText="Password"
							placeholder="Input password"
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
				<Link
					passHref
					target="_blank"
					href={`https://api.whatsapp.com/send/?phone=${whatsapp}`}
				>
					<Button variant="secondary" size="l" fullWidth className="mt-4">
						Sign up
					</Button>
				</Link>
			</section>
		</article>
	);
};

export default OrganismsFormLogin;
