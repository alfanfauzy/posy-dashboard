import {CreatedAt, UpdatedAt} from '@/data/common/types/metadata';

type Restaurant = {
	uuid: string;
	restaurant_code: string;
	restaurant_name: string;
	restaurant_description: string;
};

type OutletBased = {
	uuid: string;
	outlet_name: string;
	outlet_code: string;
	is_default: boolean;
	created_at: CreatedAt;
	updated_at: UpdatedAt;
	restaurant: Restaurant;
};

export type GetOutletSelectionDataResponse = OutletBased;
