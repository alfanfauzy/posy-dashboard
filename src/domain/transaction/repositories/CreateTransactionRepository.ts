import {QrCode} from '@/domain/qr-code/model';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateTransactionInput = {
	restaurant_outlet_uuid: string;
	restaurant_outlet_table_uuid?: string;
	customer_name?: string;
	total_pax?: number;
};

export type CreateTransactionResult = ResultMutation<QrCode | undefined>;

export type CreateTransactionRepository = {
	createTransaction(input: CreateTransactionInput): void;
} & CreateTransactionResult;
