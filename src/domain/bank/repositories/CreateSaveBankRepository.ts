/**
 * Save Bank Account
 */

import {ResultMutation} from '@/domain/vo/BaseResponse';

import {SaveBankAccountResponse} from '../models';

export type PayloadSaveBankAccount = {
	password?: string;
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
