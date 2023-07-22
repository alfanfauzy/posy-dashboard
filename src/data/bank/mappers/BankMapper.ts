import {
	GetBankListResponse,
	GetLinkedBankAccountResponse,
} from '@/data/bank/types';
import {BankLists, LinkedBankAccount} from '@/domain/bank/models';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/CreateSaveBankRepository';
import {PaymentBankAccountForm} from '@/view/payment-setting/schemas/payment/setting';

export const mapToBankListMapper = (
	datas: Array<GetBankListResponse>,
): BankLists =>
	datas.map(data => ({
		uuid: data.uuid,
		bank_code: data.bank_code,
		bank_name: data.bank_name,
	}));

export const mapToBankOptions = (
	datas: BankLists,
): Array<{value: string; label: string}> =>
	datas.map(data => ({
		label: data.bank_name,
		value: data.uuid,
	}));

export const mapToPayloadSaveBankAccount = (
	data: PaymentBankAccountForm,
	password?: string,
): PayloadSaveBankAccount => ({
	password: password,
	account_number: data.account_number,
	account_type: data.account_type?.value,
	bank_uuid: data.bank_uuid?.value,
	email: data.email,
	bank_proof_url: data.bank_proof_url,
});

export const mapToLinkedBankAccount = (
	data: GetLinkedBankAccountResponse,
): LinkedBankAccount => ({
	account_name: data.account_name,
	account_number: data.account_number,
	email: data.email_notify_withdrawal,
	bank_name: data.bank_name,
});
