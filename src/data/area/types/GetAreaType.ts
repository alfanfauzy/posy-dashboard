import {NewMetadata} from '@/data/common/types/metadata';

export type GetAreaDataResponse = {
	uuid: string;
	restaurant_outlet_uuid: string;
	name: string;
	type: string;
	width: number;
	height: number;
	table_list: Array<TableList>;
	metadata: NewMetadata;
	floor_size_name: string;
	floor_size_uuid: string;
	total_table: number;
};

export type TableList = {
	uuid: string;
	restaurant_outlet_uuid: string;
	floor_area_uuid: string;
	table_number: string;
	position_x: number;
	position_y: number;
	priority: number;
	created_at: CreatedAt;
	updated_at: UpdatedAt;
	table_seat: number;
};

type CreatedAt = {
	seconds: number;
	nanos: number;
};

type UpdatedAt = {
	seconds: number;
	nanos: number;
};
