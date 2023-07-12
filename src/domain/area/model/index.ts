import {NewMetadata} from '@/domain/vo/BaseMetadata';

export type AreaBased = {
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

export type TableList = {
	uuid: string;
	restaurant_outlet_uuid: string;
	floor_area_uuid: string;
	table_number: string;
	position_x: number;
	position_y: number;
	priority: number;
	created_at: number;
	updated_at: number;
	table_seat: number;
};

export type Area = AreaBased & {
	table_list?: Array<TableList>;
};
export type Areas = Array<AreaBased>;
