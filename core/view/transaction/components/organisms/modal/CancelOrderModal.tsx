import {listCancelReason} from '@/constants/order';
import dynamic from 'next/dynamic';
import {Button, Select} from 'posy-fnb-core';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type CancelOrderModalProps = {
	isOpen: boolean;
	close: () => void;
};

const CancelOrderModal = ({isOpen, close}: CancelOrderModalProps) => {
	return (
		<Modal open={isOpen} handleClose={close}>
			<section className="flex w-[340px] flex-col items-center justify-center p-4">
				<div className="">
					<p className="text-center text-l-semibold line-clamp-2">
						Are you sure you want to cancel Fried Kwetiau?
					</p>
					<div className="mt-6">
						<Select
							className="w-full"
							size="l"
							options={listCancelReason}
							placeholder="Select the reason"
						/>
					</div>
				</div>
				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={close}
						className="whitespace-nowrap"
					>
						No
					</Button>
					<Button variant="primary" size="l" fullWidth onClick={close}>
						Yes
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default CancelOrderModal;
