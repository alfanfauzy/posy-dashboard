import {
	BankLists,
	CheckBank,
	LinkedBankAccount,
	SaveBankAccountResponse,
} from '@/domain/bank/models';
import {ResultMutation, ResultQuery} from '@/domain/vo/BaseResponse';

/**
 * Get Bank List
 */

export type GetBankListsResult = ResultQuery<BankLists | undefined>;

/**
 * Check Bank
 */

export type PayloadBankCheck = {
	bank_uuid: string | undefined;
	account_number: string;
};

export type CheckBankResult = ResultMutation<CheckBank | undefined>;

export type CheckBankRepository = {
	checkBank(payload: PayloadBankCheck): void;
} & CheckBankResult;

/**
 * Save Bank Account
 */

export type PayloadSaveBankAccount = {
	password: string;
	account_type: string | undefined;
	bank_uuid: string | undefined;
	account_number: string;
	email: string;
	bank_proof_url: string;
};

export type SaveBankAccountResult = ResultMutation<
	SaveBankAccountResponse | undefined
>;

export type SaveBankAccountRepository = {
	saveBankAccount(payload: PayloadSaveBankAccount): void;
} & SaveBankAccountResult;

/**
 * Get Linked Bank Acocunt
 */

export type PayloadGetLinkedBankAccount = string;

export type GetLinkedBankResult = ResultQuery<LinkedBankAccount | undefined>;
