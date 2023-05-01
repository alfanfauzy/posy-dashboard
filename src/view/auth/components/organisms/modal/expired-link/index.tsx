import Logo from '@/view/common/components/atoms/logo';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import React from 'react';

const OrganismsFormExpiredLink = () => {
	const router = useRouter();

	return (
		<article className="flex h-full flex-col items-center justify-center overflow-y-auto p-14 lg:p-16 xl:p-24 w-1/3 mx-auto">
			<Logo />
			<div className="mt-10 w-full rounded-3xl p-10 shadow-basic text-center">
				<p className="text-xxl-semibold text-neutral-100">
					Reset password link is expired
				</p>
				<div className="mt-4 flex flex-col gap-4">
					<p className="text-l-regular text-primary-main">
						We&lsquo;re sorry, but the password reset link you previously
						received has expired. Click forgot password below for a new link.
					</p>
				</div>
				<Button
					variant="secondary"
					size="l"
					fullWidth
					className="mt-6"
					onClick={() => router.push('/auth/forget-password')}
				>
					Ok
				</Button>
			</div>
		</article>
	);
};

export default OrganismsFormExpiredLink;
