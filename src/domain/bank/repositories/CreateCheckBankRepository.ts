/**
 * Check Bank
 */

import {ResultMutation} from '@/domain/vo/BaseResponse';

import {CheckBank} from '../models';

export type PayloadBankCheck = {
	bank_uuid: string | undefined;
	account_number: string;
};

export type CheckBankResult = ResultMutation<CheckBank | undefined>;

export type CheckBankRepository = {
	checkBank(payload: PayloadBankCheck): void;
} & CheckBankResult;
