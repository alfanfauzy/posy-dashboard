import CreateNewPasswordForm from '@/view/auth/components/organisms/form/create-new-password';
import {useVerifyTokenViewModel} from '@/view/auth/view-models/VerifyTokenViewModel';
import {useRouter} from 'next/router';
import {Loading} from 'posy-fnb-core';
import React from 'react';

const PagesCreateNewPassword = () => {
	const {
		query: {token},
	} = useRouter();

	const {data, isLoading, isError} = useVerifyTokenViewModel(
		{
			token: token as string,
		},
		{
			enabled: !!token,
		},
	);

	if (isLoading)
		return (
			<div className="flex h-full items-center justify-center">
				<Loading size={90} />
			</div>
		);

	if (isError)
		return (
			<div className="flex h-full items-center justify-center">
				Token is invalid
			</div>
		);

	return (
		<main className="h-full">
			{data?.is_valid && <CreateNewPasswordForm />}
		</main>
	);
};

export default PagesCreateNewPassword;
