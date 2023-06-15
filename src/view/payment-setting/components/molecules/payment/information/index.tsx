import {whatsapp_link} from '@/view/common/constants/contact';
import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {Button} from 'posy-fnb-core';
import React, {useContext} from 'react';

const PaymentInformationEmptyStateMolecules = () => {
	const {handleOpenModal, handleIsShowModalDifferentPaymentType} = useContext(
		PaymentSettingContext,
	);

	return (
		<>
			<p className="mb-4 text-m-medium">
				You haven’t activate payment Integration. Please activate by registering
				your bank account first.
			</p>
			<div className="mb-4 border border-neutral-40"></div>
			<div className="flex justify-between">
				<p className="text-m-medium">
					We provide two types of payment, owned account and manage account.
					<span
						onClick={handleIsShowModalDifferentPaymentType}
						className="text-[#654DE4] underline cursor-pointer"
					>
						What`s the different?
					</span>
				</p>
				<Button onClick={handleOpenModal}>Add Bank Account</Button>
			</div>
		</>
	);
};

const PaymentInformationWitDataMolecules = () => {
	const {
		handleOpenModal,
		paymentAccountInfoData,
		bankAccountData,
		handleIsEdit,
		handleIsShowModalDifferentPaymentType,
	} = useContext(PaymentSettingContext);

	const handleModal = () => {
		handleIsEdit(true);
		handleOpenModal();
	};

	const typePayment =
		paymentAccountInfoData?.type === 'OWNED'
			? 'Owned Account'
			: 'Managed Account';

	return (
		<div>
			<div className="mb-4 flex flex-row justify-between">
				<section>
					<p className="mb-2 text-m-semibold">Type of payment</p>
					<p className="text-m-regular">{typePayment}</p>
				</section>
				<section>
					<p className="mb-2 text-m-semibold">Bank name</p>
					<p className="text-m-regular">{bankAccountData?.bank_name}</p>
				</section>
				<section>
					<p className="mb-2 text-m-semibold">Account number</p>
					<p className="text-m-regular">{bankAccountData?.account_number}</p>
				</section>
				<section>
					<p className="mb-2 text-m-semibold">Bank account name</p>
					<p className="text-m-regular line-clamp-1 block">
						{bankAccountData?.account_name}
					</p>
				</section>
				<section>
					<p className="mb-2 text-m-semibold">Email notification</p>
					<p className="text-m-regular">{bankAccountData?.email}</p>
				</section>
			</div>
			<div className="mb-4 border border-neutral-40"></div>
			<div className="flex justify-start gap-2">
				<p className="text-m-medium flex-1">
					We provide two types of payment, Owned account and Manage account.
					<span
						onClick={handleIsShowModalDifferentPaymentType}
						className="text-[#654DE4] underline cursor-pointer"
					>
						What`s the different?
					</span>
					<br />
					If you want to make your own payment account, please contact our
					customer support.
				</p>
				<Button variant="secondary" onClick={() => window.open(whatsapp_link)}>
					Contact Support
				</Button>
				<Button onClick={handleModal}>Edit Information</Button>
			</div>
		</div>
	);
};

const PaymentInformationMolecules = () => {
	const {bankAccountData} = useContext(PaymentSettingContext);

	return (
		<section className="h-auto w-auto gap-5 rounded-md border border-gray-200 bg-white p-4 shadow-md mt-5 mb-6">
			<h1 className="mb-4 text-l-bold">Payment information</h1>
			{bankAccountData !== undefined ? (
				<PaymentInformationWitDataMolecules />
			) : (
				<PaymentInformationEmptyStateMolecules />
			)}
		</section>
	);
};

export default PaymentInformationMolecules;
