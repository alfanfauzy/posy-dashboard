/* eslint-disable @typescript-eslint/no-empty-function */
import {LinkedBankAccount} from '@/domain/bank/models';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/BankRepository';
import {
	PaymentAccountInfo,
	PaymentBalance,
	PaymentWithdrawPayload,
} from '@/domain/payment/models';
import {createContext} from 'react';

type PaymentSettingContextProps = {
	bankAccountData: LinkedBankAccount | undefined;
	paymentAccountInfoData: PaymentAccountInfo | undefined;
	paymentBalanceData: PaymentBalance | undefined;
	isShowModalDifferentPaymentType: boolean;
	handleIsShowModalDifferentPaymentType: () => void;
	handleOpenModal: () => void;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
	isOpenModal: boolean;
	isEdit: boolean;
	isOpenPasswordConfirmation: boolean;
	handleIsOpenPasswordConfirmation: () => void;
	payloadEditInformation: object;
	setPayloadEditInformation: React.Dispatch<React.SetStateAction<object>>;
	confirmationType: string;
	setConfirmationType: React.Dispatch<React.SetStateAction<string>>;
	saveBankAccount: (payload: PayloadSaveBankAccount) => void;
	isLoadingSaveBankAccount: boolean;
	isOpenSuccessConfirmation: boolean;
	handleIsOpenSuccessConfirmation: () => void;
	isOpenFormWithdraw: boolean;
	handleIsOpenFormWithdraw: () => void;
	payloadWithdraw: {amount: number};
	setPayloadWithdraw: React.Dispatch<React.SetStateAction<{amount: number}>>;
	isOpenWithdrawConfirmation: boolean;
	handleIsOpenWithdrawConfirmation: () => void;
	createPaymentWithdraw: (payload: PaymentWithdrawPayload) => void;
	isLoadingPaymentWithdraw: boolean;
	isLoadingPaymentBalance: boolean;
	isOpenPasswordConfirmationBank: boolean;
	handleIsOpenPasswordConfirmationBank: () => void;
};

export const PaymentSettingContext = createContext<PaymentSettingContextProps>({
	bankAccountData: undefined,
	paymentAccountInfoData: undefined,
	paymentBalanceData: undefined,
	isShowModalDifferentPaymentType: false,
	isOpenModal: false,
	isEdit: false,
	isOpenPasswordConfirmation: false,
	payloadEditInformation: {},
	confirmationType: '',
	isOpenSuccessConfirmation: false,
	isOpenFormWithdraw: false,
	payloadWithdraw: {amount: 0},
	isLoadingPaymentWithdraw: false,
	createPaymentWithdraw: () => {},
	setPayloadWithdraw: () => {},
	handleIsOpenFormWithdraw: () => {},
	handleIsOpenSuccessConfirmation: () => {},
	setConfirmationType: () => {},
	setPayloadEditInformation: () => {},
	handleIsOpenPasswordConfirmation: () => {},
	handleIsShowModalDifferentPaymentType: () => {},
	handleOpenModal: () => {},
	setIsEdit: () => {},
	saveBankAccount: () => {},
	isLoadingSaveBankAccount: false,
	isOpenWithdrawConfirmation: false,
	handleIsOpenWithdrawConfirmation: () => {},
	isLoadingPaymentBalance: false,
	isOpenPasswordConfirmationBank: false,
	handleIsOpenPasswordConfirmationBank: () => {},
});
