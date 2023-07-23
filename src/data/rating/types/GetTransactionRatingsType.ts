import {Metadata} from '@/data/common/types/metadata';

export type GetTransactionRatingsDataResponse = {
	uuid: string;
	transaction_uuid: string;
	restaurant_outlet_uuid: string;
	rating: number;
	review: Array<string>;
	review_note: string;
	avg_rating: number;
	is_show: boolean;
	customer_info: {
		name: string;
		phone: string;
		email: string;
	};
	metadata: Metadata;
};
