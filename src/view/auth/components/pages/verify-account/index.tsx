import VerifyAccountForm from '@/view/auth/components/organisms/modal/verify-account';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import React, {useEffect} from 'react';

const PagesVerifyAccount = () => {
	useEffect(() => {
		logEvent({
			category: 'forgot_password',
			action: 'forgotPassword_emailSent_view',
		});
	}, []);

	return (
		<main className="h-full">
			<VerifyAccountForm />
		</main>
	);
};

export default PagesVerifyAccount;
