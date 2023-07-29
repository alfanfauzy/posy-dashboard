import {WHATSAPP_NUMBER} from '@/view/common/constants/contact';
import Image from 'next/image';
import Link from 'next/link';
import {Button, Modal} from 'posy-fnb-core';
import React from 'react';

const subsNeeded = require('public/images/subscription-needed.png');

type SubscriptionNeededModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const SubscriptionNeededModal = ({
	isOpen,
	setIsOpen,
}: SubscriptionNeededModalProps) => {
	return (
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
						href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`}
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
	);
};

export default SubscriptionNeededModal;
