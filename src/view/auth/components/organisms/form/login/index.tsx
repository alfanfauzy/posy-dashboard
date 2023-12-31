import {Login} from '@/domain/auth/model';
import {BaseError} from '@/domain/vo/BaseError';
import {
	validationSchemaLogin,
	ValidationSchemaLoginType,
} from '@/view/auth/schemas';
import {useLoginViewModel} from '@/view/auth/view-models/LoginViewModel';
import Logo from '@/view/common/components/atoms/logo';
import firebaseApp from '@/view/common/config/firebase';
import {WHATSAPP_NUMBER} from '@/view/common/constants/contact';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppDispatch} from '@/view/common/store/hooks';
import {onLoginSuccess} from '@/view/common/store/slices/auth';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {getMessaging, getToken} from 'firebase/messaging';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Button, Input} from 'posy-fnb-core';
import React, {useEffect, useState} from 'react';
import * as reactHookForm from 'react-hook-form';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {IoIosAlert} from 'react-icons/io';

const OrganismsFormLogin = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [showPassword, {toggle}] = useDisclosure({initialState: false});
	const [notifToken, setNotifToken] = useState<string>('');

	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
		reset,
		setError,
	} = useForm({mode: 'onChange', schema: validationSchemaLogin});

	const {login, isLoading: loadLogin} = useLoginViewModel({
		onSuccess: _data => {
			const data = _data as Login;
			if (data) {
				dispatch(onLoginSuccess(data));
				router.push('/transaction');
				logEvent({
					category: 'login',
					action: 'login_successful',
				});
			}
		},
		onError: _error => {
			const error = _error as BaseError;
			reset();
			setError(
				'password',
				{message: error.message},
				{
					shouldFocus: true,
				},
			);
			logEvent({
				category: 'login',
				action: 'login_failed',
			});
		},
	});

	const onSubmit: reactHookForm.SubmitHandler<
		ValidationSchemaLoginType
	> = form => {
		logEvent({
			category: 'login',
			action: 'login_submit',
		});
		login({...form, notif_token: notifToken});
	};

	const handleForgetPassword = () => {
		router.push('forget-password');
		logEvent({
			category: 'login',
			action: 'login_forgotPassword_click',
		});
	};

	const handleSignUp = () => {
		logEvent({
			category: 'login',
			action: 'login_signup_click',
		});
	};

	useEffect(() => {
		logEvent({
			category: 'login',
			action: 'login_view',
		});
	}, []);

	useEffect(() => {
		const message = getMessaging(firebaseApp);

		getToken(message, {
			vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
		})
			.then(currentToken => {
				if (currentToken) {
					setNotifToken(currentToken);
				} else {
					// Show permission request.
					console.log(
						'No registration token available. Request permission to generate one.',
					);
				}
			})
			.catch(err => {
				console.log('An error occurred while retrieving token. ', err);
			});
	}, []);

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
							onClick={handleForgetPassword}
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
					onClick={handleSignUp}
					href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`}
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
