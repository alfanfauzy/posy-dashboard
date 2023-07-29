import {SubscriptionSection} from '@/domain/subscription/model';
import {WHATSAPP_NUMBER} from '@/view/common/constants/contact';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import Image from 'next/image';
import Link from 'next/link';
import {Button, Loading} from 'posy-fnb-core';
import React from 'react';

const RenewSubs = require('public/images/renew-subscription.png');

type SubscriptionPlanProps = {
	data: SubscriptionSection | undefined;
	isLoading: boolean;
};

const SubscriptionPlan = ({data, isLoading}: SubscriptionPlanProps) => {
	return (
		<section>
			<h1 className="text-xl-semibold text-neutral-100">Subscription</h1>
			<div className="mt-4 md:flex gap-6">
				<aside className="w-full md:w-1/3 rounded-3xl border border-neutral-30 p-6 shadow-md">
					{isLoading ? (
						<div className="flex items-center justify-center h-full">
							<Loading size={60} />
						</div>
					) : (
						<div>
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
								<p className="mt-0.5 text-m-regular">
									{data?.subscription_name}
								</p>
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
						</div>
					)}
				</aside>

				<aside className="md:mt-0 mt-6 w-full md:w-2/3 rounded-3xl border border-neutral-30 p-6 shadow-md">
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
								food and beverage business? Our subscription service has got you
								covered!
							</p>
							<Link
								passHref
								target="_blank"
								href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`}
							>
								<Button className="mt-10" fullWidth>
									Renew Subscription
								</Button>
							</Link>
						</div>
					</div>
				</aside>
			</div>
		</section>
	);
};

export default SubscriptionPlan;
