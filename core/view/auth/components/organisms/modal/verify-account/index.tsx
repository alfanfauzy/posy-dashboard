import Logo from '@/atoms/logo';
import {maskEmail} from '@/utils/UtilsMaskEmail';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import React from 'react';

const OrganismsFormVerifyAccount = () => {
	const router = useRouter();
	const {email} = router.query || '';

	return (
		<article className="flex h-full flex-col items-center justify-center overflow-y-auto p-14 lg:p-16 xl:p-24">
			<Logo />
			<div className="mt-10 w-full rounded-3xl p-10 shadow-basic">
				<p className="text-xxl-semibold text-neutral-100">Email sent</p>
				<div className="mt-4 flex flex-col gap-4">
					<p className="text-l-regular text-primary-main">
						We sent an email to <b>{maskEmail(email as string)} </b> with a link
						to get back into your account.
					</p>
				</div>
				<Button
					variant="secondary"
					size="l"
					fullWidth
					className="mt-6"
					onClick={() => router.push('login')}
				>
					Ok
				</Button>
			</div>
		</article>
	);
};

export default OrganismsFormVerifyAccount;
