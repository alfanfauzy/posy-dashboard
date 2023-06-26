import {BankLists} from '@/domain/bank/models';
import {ResultQuery} from '@/domain/vo/BaseResponse';

/**
 * Get Bank List
 */

export type GetBankListsResult = ResultQuery<BankLists | undefined>;
