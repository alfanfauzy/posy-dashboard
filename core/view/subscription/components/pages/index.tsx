import {dateFormatter} from '@/utils/dateFormatter';
import {useGetSubscriptionSectionViewModel} from '@/view/subscription/view-models/GetSubscriptionSectionViewModel';
import Image from 'next/image';
import Link from 'next/link';
import {Button, Modal} from 'posy-fnb-core';
import RenewSubs from 'public/images/renew-subscription.png';
import subsNeeded from 'public/images/renew-subscription.png';
import React, {useLayoutEffect, useState} from 'react';

const ViewSubscriptionPage = () => {
	const {data} = useGetSubscriptionSectionViewModel();

	const [isOpen, setIsOpen] = useState(false);
	const [isFirstRender, setIsFirstRender] = useState(true);

	useLayoutEffect(() => {
		if (isFirstRender && data && !data?.isSubscription) {
			setIsOpen(true);
			setIsFirstRender(false);
		}
	}, [data, isFirstRender]);

	return (
		<main className="flex h-full w-full">
			<article className="flex h-full w-full flex-col rounded-2xl bg-neutral-10 p-6">
				<section className="flex items-start justify-between">
					<p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
						Subscription
					</p>
				</section>

				<section className="mt-6 flex gap-6 xl:w-[90%]">
					<aside className="w-1/3 rounded-3xl border border-neutral-30 p-6 shadow-md">
						<div>
							<p className="text-l-semibold">Subscription Status</p>
							<p
								className={`mt-0.5 text-l-semibold ${
									data?.isSubscription
										? 'text-green-success'
										: 'text-red-caution'
								}`}
							>
								{data?.status}
							</p>
						</div>
						<div className="mt-3 border-b border-neutral-30" />
						<div className="mt-3">
							<p className="text-m-semibold">Subscription Plan</p>
							<p className="mt-0.5 text-m-regular">{data?.subscription_name}</p>
						</div>
						<div className="mt-3">
							<p className="text-m-semibold">Expired Date</p>
							<p
								className={`mt-0.5 text-m-regular ${
									data?.isSubscription
										? 'text-green-success'
										: 'text-red-caution'
								}`}
							>
								{data?.end_date && dateFormatter(data.end_date)}
							</p>
						</div>
					</aside>

					<aside className="w-2/3 rounded-3xl border border-neutral-30 p-6 shadow-md">
						<div className="flex flex-col items-center gap-6 lg:flex-row">
							<Image
								src={RenewSubs}
								alt="renew-subscription"
								width={253}
								height={201}
								priority
							/>
							<div>
								<h2 className="text-xxl-bold">Only 199K / Month</h2>
								<p className="mt-2 text-l-regular text-primary-main">
									Looking for a powerful and user-friendly POS system for your
									food and beverage business? Our subscription service has got
									you covered!
								</p>
								<Link
									passHref
									target="_blank"
									href="https://api.whatsapp.com/send/?phone=6282125270900"
								>
									<Button className="mt-10" fullWidth>
										Renew Subscription
									</Button>
								</Link>
							</div>
						</div>
					</aside>
				</section>
			</article>

			<Modal
				closeOverlay
				open={isOpen}
				handleClose={() => setIsOpen(false)}
				className="!w-1/2 !p-12"
			>
				<section className="flex w-full items-center justify-center gap-4">
					<div className="w-1/2">
						<h1 className="text-heading-s-bold text-primary-main">
							Subscription Needed
						</h1>
						<p className="mt-4 text-l-regular text-primary-main">
							We’re sorry that you need to subscribe to access the application.
							Please renew the subscription first.
						</p>
						<Link
							passHref
							target="_blank"
							href="https://api.whatsapp.com/send/?phone=6282125270900"
						>
							<Button className="mt-10" fullWidth>
								Renew Subscription
							</Button>
						</Link>
					</div>
					<div className="w-1/2">
						<Image priority src={subsNeeded} alt="subscription-needed" />
					</div>
				</section>
			</Modal>
		</main>
	);
};

export default ViewSubscriptionPage;
