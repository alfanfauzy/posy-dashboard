import {CreatedAt, UpdatedAt} from '@/data/common/types/metadata';

export type GetTableDataResponse = {
	uuid: string;
	restaurant_outlet_uuid: string;
	table_number: string;
	priority: number;
	created_at: CreatedAt;
	updated_at: UpdatedAt;
	floor_area_uuid: string;
	table_seat: number;
	table_image: string;
	position_x: number;
	position_y: number;
};
