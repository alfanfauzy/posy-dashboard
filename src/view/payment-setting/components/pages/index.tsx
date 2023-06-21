import {useGetLinkedBankAccountViewModel} from '@/view/bank/view-models/GetLinkedBankAccountViewModel';
import {useSaveAccountBankViewModal} from '@/view/bank/view-models/PostSaveAccountBankViewModel';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import PaymentInformationMolecules from '@/view/payment-setting/components/molecules/payment/information';
import {useGetPaymentAccountInfoViewModel} from '@/view/payment-setting/view-models/GetPaymentAccountInfoViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Loading} from 'posy-fnb-core';
import React, {useMemo, useState} from 'react';

import {useUpdatePaymentWithdrawViewModal} from '../../view-models/CreatePaymentWithdrawViewModel';
import {useGetPaymentBalanceViewModel} from '../../view-models/GetPaymentBalanceViewModel';
import DifferentPaymentModalOrganism from '../molecules/modal/different-payment';
import SuccessUpdateInformationMolecules from '../molecules/modal/success-update-information';
import WithdrawConfirmationMolecules from '../molecules/modal/withdraw-confirmation';
import PaymentBalanceMolecules from '../molecules/payment/balance';
import PasswordConfirmationOrganism from '../organism/form/password-confirmation';
import PaymentOptionForm from '../organism/form/payment/options';
import FormPaymentSetting from '../organism/form/payment/setting';
import FormWithdrawOrganism from '../organism/form/withdraw';

const ViewPaymentSettingPage = () => {
	const queryClient = useQueryClient();
	const [confirmationType, setConfirmationType] = useState('');
	const [payloadEditInformation, setPayloadEditInformation] = useState({});
	const [payloadWithdraw, setPayloadWithdraw] = useState({amount: 0});

	const [
		isShowModalDifferentPaymentType,
		{toggle: handleIsShowModalDifferentPaymentType},
	] = useDisclosure({
		initialState: false,
	});

	const [isOpenModal, {toggle: handleOpenModal}] = useDisclosure({
		initialState: false,
	});

	const [isEdit, setIsEdit] = useState(false);

	const [
		isOpenPasswordConfirmation,
		{toggle: handleIsOpenPasswordConfirmation},
	] = useDisclosure({
		initialState: false,
	});

	const [isOpenSuccessConfirmation, {toggle: handleIsOpenSuccessConfirmation}] =
		useDisclosure({
			initialState: false,
		});

	const [isOpenFormWithdraw, {toggle: handleIsOpenFormWithdraw}] =
		useDisclosure({
			initialState: false,
		});

	const [
		isOpenWithdrawConfirmation,
		{toggle: handleIsOpenWithdrawConfirmation},
	] = useDisclosure({
		initialState: false,
	});

	const {data: bankAccountData, isLoading} = useGetLinkedBankAccountViewModel();

	const {data: paymentAccountInfoData} = useGetPaymentAccountInfoViewModel({
		enabled: bankAccountData !== undefined,
	});

	const {data: paymentBalanceData, isLoading: isLoadingPaymentBalance} =
		useGetPaymentBalanceViewModel({enabled: bankAccountData !== undefined});

	/**
	 * Service Save Account Bank
	 */

	const {saveBankAccount, isLoading: isLoadingSaveBankAccount} =
		useSaveAccountBankViewModal({
			onSuccess() {
				if (isEdit) {
					setIsEdit(false);
					handleIsOpenPasswordConfirmation();
					handleIsOpenSuccessConfirmation();
				} else {
					handleOpenModal();
					handleIsOpenSuccessConfirmation();
				}
				queryClient.invalidateQueries(['linked-bank-account']);
				queryClient.invalidateQueries(['payment-account-info']);
			},
		});

	/**
	 * Create Payment Withdraw
	 */

	const {createPaymentWithdraw, isLoading: isLoadingPaymentWithdraw} =
		useUpdatePaymentWithdrawViewModal({
			onSuccess() {
				handleIsOpenPasswordConfirmation();
				handleIsOpenSuccessConfirmation();
				queryClient.invalidateQueries(['payment-balance']);
			},
		});

	const valueProvider = useMemo(
		() => ({
			bankAccountData,
			paymentAccountInfoData,
			paymentBalanceData,
			isShowModalDifferentPaymentType,
			handleIsShowModalDifferentPaymentType,
			handleOpenModal,
			setIsEdit,
			isOpenModal,
			isEdit,
			isOpenPasswordConfirmation,
			handleIsOpenPasswordConfirmation,
			payloadEditInformation,
			setPayloadEditInformation,
			confirmationType,
			setConfirmationType,
			saveBankAccount,
			isLoadingSaveBankAccount,
			isOpenSuccessConfirmation,
			handleIsOpenSuccessConfirmation,
			isOpenFormWithdraw,
			handleIsOpenFormWithdraw,
			payloadWithdraw,
			setPayloadWithdraw,
			isOpenWithdrawConfirmation,
			handleIsOpenWithdrawConfirmation,
			createPaymentWithdraw,
			isLoadingPaymentWithdraw,
			isLoadingPaymentBalance,
		}),
		[
			bankAccountData,
			paymentAccountInfoData,
			paymentBalanceData,
			isShowModalDifferentPaymentType,
			handleIsShowModalDifferentPaymentType,
			handleOpenModal,
			setIsEdit,
			isOpenModal,
			isEdit,
			isOpenPasswordConfirmation,
			handleIsOpenPasswordConfirmation,
			payloadEditInformation,
			setPayloadEditInformation,
			confirmationType,
			setConfirmationType,
			saveBankAccount,
			isLoadingSaveBankAccount,
			isOpenSuccessConfirmation,
			handleIsOpenSuccessConfirmation,
			isOpenFormWithdraw,
			handleIsOpenFormWithdraw,
			payloadWithdraw,
			setPayloadWithdraw,
			isOpenWithdrawConfirmation,
			handleIsOpenWithdrawConfirmation,
			createPaymentWithdraw,
			isLoadingPaymentWithdraw,
			isLoadingPaymentBalance,
		],
	);

	return (
		<main className="flex h-full w-full">
			<article className="flex h-full w-full overflow-auto flex-col rounded-2xl bg-neutral-10 p-6">
				<section className="flex items-start justify-between">
					<p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
						Payment Integration
					</p>
				</section>
				<PaymentSettingContext.Provider value={valueProvider}>
					{isLoading ? (
						<div className="m-auto">
							<Loading size={50} />
						</div>
					) : (
						<>
							{bankAccountData && <PaymentBalanceMolecules />}
							<PaymentInformationMolecules />
							{bankAccountData && <PaymentOptionForm />}
						</>
					)}

					{isShowModalDifferentPaymentType && <DifferentPaymentModalOrganism />}
					{isOpenModal && <FormPaymentSetting />}
					{isOpenFormWithdraw && <FormWithdrawOrganism />}
					{isOpenWithdrawConfirmation && <WithdrawConfirmationMolecules />}
					{isOpenPasswordConfirmation && <PasswordConfirmationOrganism />}
					{isOpenSuccessConfirmation && <SuccessUpdateInformationMolecules />}
				</PaymentSettingContext.Provider>
			</article>
		</main>
	);
};

export default ViewPaymentSettingPage;
