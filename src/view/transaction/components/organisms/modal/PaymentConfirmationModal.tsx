import {Modal} from 'antd';
import {Button} from 'posy-fnb-core';
import React from 'react';

type PaymentConfirmationModalProps = {
	close: () => void;
	isOpen: boolean;
	submit: () => void;
	loading: boolean;
};

const PaymentConfirmationModal = ({
	isOpen,
	close,
	submit,
	loading,
}: PaymentConfirmationModalProps) => {
	return (
		<Modal
			open={isOpen}
			onCancel={close}
			closable={false}
			footer={null}
			width={400}
		>
			<section className="flex w-[380px] flex-col items-center justify-center p-4 m-auto">
				<div className="px-16">
					<p className="text-center text-l-semibold">
						Are you sure to close the transaction? All of your order will be
						updated to Served
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
						No
					</Button>
					<Button
						isLoading={loading}
						variant="primary"
						size="l"
						fullWidth
						onClick={submit}
					>
						Yes
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default PaymentConfirmationModal;
