import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type CancelTransactionModalProps = {
	close: () => void;
	isOpen: boolean;
};

const CancelTransactionModal = ({
	isOpen,
	close,
}: CancelTransactionModalProps) => {
	return (
		<Modal open={isOpen} handleClose={close}>
			<section className="flex w-[380px] flex-col items-center justify-center p-4">
				<div className="px-16">
					<p className="text-center text-l-semibold line-clamp-2">
						Are you sure you want to delete this transaction?
					</p>
				</div>
				<div className="mt-8 flex w-full gap-3">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={close}
						className="whitespace-nowrap"
					>
						No, Maybe Later
					</Button>
					<Button variant="primary" size="l" fullWidth onClick={close}>
						Delete Trx
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default CancelTransactionModal;
