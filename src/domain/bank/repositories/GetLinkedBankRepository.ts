/**
 * Get Linked Bank Acocunt
 */

import {ResultQuery} from '@/domain/vo/BaseResponse';

import {LinkedBankAccount} from '../models';

export type PayloadGetLinkedBankAccount = string;

export type GetLinkedBankResult = ResultQuery<LinkedBankAccount | undefined>;
