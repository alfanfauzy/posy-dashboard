import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {Modal} from 'antd';
import Image from 'next/image';
import {Button} from 'posy-fnb-core';
import React, {useContext} from 'react';

const SuccessIcon = require('public/images/success-icon.png');

const CONTENT_MODAL: Record<string, {title: string; body: string}> = {
	'edit-information': {
		title: 'Payment Information Updated',
		body: `We've received your payment information. You can use our payment integration feature now.`,
	},
	withdraw: {
		title: 'Withdraw on process',
		body: `We have received your request to withdraw. We will notify you once the transaction is completed by email.`,
	},
};

const SuccessUpdateInformationMolecules = () => {
	const {
		isOpenSuccessConfirmation,
		handleIsOpenSuccessConfirmation,
		confirmationType,
	} = useContext(PaymentSettingContext);

	const getContent = CONTENT_MODAL[confirmationType];

	return (
		<Modal
			maskClosable={false}
			open={isOpenSuccessConfirmation}
			closable={false}
			footer={
				<div className="p-4">
					<Button
						variant="secondary"
						fullWidth
						size="xl"
						onClick={handleIsOpenSuccessConfirmation}
					>
						Close
					</Button>
				</div>
			}
			width={382}
		>
			<div className="flex flex-col items-center px-8 pt-8">
				<Image src={SuccessIcon} alt="success" width={50} />
				<h2 className="text-xxl-semibold py-4">{getContent.title}</h2>
				<div className="border border-neutral-30 w-full mb-6" />
				<p className="text-center text-l-regular">{getContent.body}</p>
			</div>
		</Modal>
	);
};

export default SuccessUpdateInformationMolecules;
