import {UpdatedAt} from '@/data/common/types/metadata';

export type CreateApplyDiscountDataResponse = {
	uuid: string;
	metadata: {
		updated_at: UpdatedAt;
	};
};
