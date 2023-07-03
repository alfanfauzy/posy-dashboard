import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {Modal} from 'antd';
import Image from 'next/image';
import React from 'react';
import {useContext} from 'react';

const ManageAccount = require('public/images/manage-account.png');
const OwnedAccount = require('public/images/owned-account.png');

const DifferentPaymentModalOrganism = () => {
	const {
		handleIsShowModalDifferentPaymentType,
		isShowModalDifferentPaymentType,
	} = useContext(PaymentSettingContext);

	return (
		<Modal
			maskClosable={false}
			open={isShowModalDifferentPaymentType}
			onCancel={handleIsShowModalDifferentPaymentType}
			title={
				<h1 className="text-xl-semibold border-b border-neutral-40 p-4">
					Payment comparison
				</h1>
			}
			footer={null}
			width={800}
		>
			<div className="w-auto p-5 grid gap-4 grid-cols-2">
				<section className="flex gap-4 flex-col">
					<Image
						src={OwnedAccount}
						alt="owned-account"
						width={350}
						priority
						className="border"
					/>
					<p className="text-m-bold">Owned Account</p>
					<ol className="list-decimal block px-4">
						<li>Real time registration process. </li>
						<li>The payment method can be used immediately.</li>
						<li>The ID name that appears is PT Ventura Pertama.</li>
					</ol>
				</section>
				<section className="flex gap-4 flex-col">
					<Image
						src={ManageAccount}
						alt="owned-account"
						width={350}
						priority
						className="border"
					/>
					<p className="text-m-bold">Managed Account</p>
					<ol className="list-decimal block px-4">
						<li>
							The registration process must go through Xendit (Our third party),
							approximately 2-3 working days.
						</li>
						<li>During the registration process, payment cannot be used.</li>
						<li>The ID name that appears is the merchant name.</li>
					</ol>
				</section>
			</div>
		</Modal>
	);
};

export default DifferentPaymentModalOrganism;
