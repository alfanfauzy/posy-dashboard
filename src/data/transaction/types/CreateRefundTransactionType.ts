import {CreatedAt} from '@/data/common/types/metadata';

export type CreateRefundTransactionDataResponse = {
	uuid: string;
	metadata: {
		created_at: CreatedAt;
	};
};
