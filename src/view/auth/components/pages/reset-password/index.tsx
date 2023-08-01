import CreateNewPasswordForm from '@/view/auth/components/organisms/form/create-new-password';
import {useVerifyTokenViewModel} from '@/view/auth/view-models/VerifyTokenViewModel';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {useRouter} from 'next/router';
import {Loading} from 'posy-fnb-core';
import React, {useEffect} from 'react';

import OrganismsFormExpiredLink from '../../organisms/modal/expired-link';

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

	useEffect(() => {
		logEvent({
			category: 'forgot_password',
			action: 'forgotPassword_createPassword_view',
		});
	}, []);

	if (isLoading)
		return (
			<div className="flex h-full items-center justify-center">
				<Loading size={90} />
			</div>
		);

	if (isError) return <OrganismsFormExpiredLink />;

	return (
		<main className="h-full">
			{data?.is_valid && <CreateNewPasswordForm />}
		</main>
	);
};

export default PagesCreateNewPassword;
