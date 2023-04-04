import {toRupiah} from '@/utils/common';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React from 'react';
import {BsFillCheckCircleFill} from 'react-icons/bs';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type PaymentConfirmationModalProps = {
	isOpenPaymentConfirmation: boolean;
	closePaymentConfirmation: () => void;
	valueState:
		| {
				total: number;
		  }
		| undefined;
};

const PaymentConfirmationModal = ({
	closePaymentConfirmation,
	isOpenPaymentConfirmation,
	valueState,
}: PaymentConfirmationModalProps) => {
	return (
		<Modal
			closeOverlay
			open={isOpenPaymentConfirmation}
			handleClose={closePaymentConfirmation}
			className="min-w-[382px]"
		>
			{valueState && (
				<section>
					<div className="flex flex-col items-center justify-center">
						<BsFillCheckCircleFill size={52} className="text-green-success" />
						<p className="mt-5 text-xxl-semibold text-primary-main">
							Payment completed!
						</p>
						<p className="text-l-regular text-neutral-70">
							ID: OR01C320101230001
						</p>
					</div>
					<div className="mt-6 flex flex-col gap-2 border-t border-neutral-30 pt-6 pb-2">
						<div className="flex items-center justify-between">
							<p className="text-l-semibold text-primary-main">Total amount</p>
							<p className="text-l-semibold text-primary-main">
								{toRupiah(valueState.total)}
							</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-m-regular text-primary-main">Payment type</p>
							<p className="text-m-semibold text-primary-main">Debit</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-m-regular text-primary-main">Provider</p>
							<p className="text-m-semibold text-primary-main">BCA</p>
						</div>
					</div>
					<div className="border-t border-neutral-30 py-2">
						<div className="flex items-center justify-between">
							<p className="text-l-semibold text-primary-main">Amount paid</p>
							<p className="text-l-semibold text-primary-main">Rp510.000</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-l-semibold text-primary-main">Change</p>
							<p className="text-l-semibold text-primary-main">-</p>
						</div>
					</div>
					<div className="mt-12 flex items-center justify-center gap-4">
						<Button
							size="xl"
							variant="secondary"
							className="w-1/2"
							onClick={closePaymentConfirmation}
						>
							Close
						</Button>
						<Button
							size="xl"
							className="w-1/2"
							onClick={closePaymentConfirmation}
						>
							Print Receipt
						</Button>
					</div>
				</section>
			)}
		</Modal>
	);
};

export default PaymentConfirmationModal;
