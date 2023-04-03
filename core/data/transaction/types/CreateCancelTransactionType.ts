import {CancelAt} from '@/data/common/types/metadata';

export type CreateCancelTransactionDataResponse = {
	uuid: string;
	cancel_at: CancelAt;
};
