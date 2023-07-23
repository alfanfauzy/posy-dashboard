import {NewMetadata} from '@/data/common/types/metadata';

export type GetAreasDataResponse = {
	uuid: string;
	restaurant_outlet_uuid: string;
	name: string;
	type: string;
	width: number;
	height: number;
	metadata: NewMetadata;
	floor_size_name: string;
	floor_size_uuid: string;
	total_table: number;
	total_waiting_food: number;
};
