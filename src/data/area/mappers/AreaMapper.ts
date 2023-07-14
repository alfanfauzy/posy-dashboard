import {Area, Areas} from '@/domain/area/model';
import {CreateArea} from '@/domain/area/repositories/CreateAreaRepository';
import {DeleteArea} from '@/domain/area/repositories/DeleteAreaRepository';

import {CreateAreaDataResponse} from '../types/CreateAreaType';
import {DeleteAreaDataResponse} from '../types/DeleteAreaType';
import {GetAreasDataResponse} from '../types/GetAreasType';
import {GetAreaDataResponse} from '../types/GetAreaType';
import {UpdateAreaDataResponse} from '../types/UpdateAreaType';

export const mapToAreasModel = (datas: Array<GetAreasDataResponse>): Areas =>
	datas?.map(data => ({
		name: data.name,
		uuid: data.uuid,
		restaurant_outlet_uuid: data.restaurant_outlet_uuid,
		height: data.height,
		width: data.width,
		type: data.type,
		metadata: {
			cancel_at: data.metadata.cancel_at,
			created_at: data.metadata.created_at,
			updated_at: data.metadata.updated_at,
		},
		floor_size_name: data.floor_size_name,
		floor_size_uuid: data.floor_size_uuid,
		total_table: data.total_table,
		total_waiting_food: data.total_waiting_food,
	}));

export const mapToAreaModel = (data: GetAreaDataResponse): Area => ({
	name: data.name,
	uuid: data.uuid,
	type: data.type,
	height: data.height,
	width: data.width,
	restaurant_outlet_uuid: data.restaurant_outlet_uuid,
	metadata: data.metadata,
	table_list: data.table_list?.map(table => ({
		created_at: table.created_at.seconds,
		restaurant_outlet_uuid: table.restaurant_outlet_uuid,
		floor_area_uuid: table.floor_area_uuid,
		position_x: table.position_x,
		position_y: table.position_y,
		priority: table.priority,
		table_number: table.table_number,
		updated_at: table.updated_at.seconds,
		uuid: table.uuid,
		table_seat: table.table_seat,
	})),
	floor_size_name: data.floor_size_name,
	floor_size_uuid: data.floor_size_uuid,
	total_table: data.total_table,
	total_waiting_food: data.total_waiting_food,
});

export const mapToCreateAreaModel = (
	data: CreateAreaDataResponse,
): CreateArea => ({
	uuid: data.uuid,
	metadata: data.metadata,
});

export const mapToUpdateAreaModel = (
	data: UpdateAreaDataResponse,
): CreateArea => ({
	uuid: data.uuid,
	metadata: data.metadata,
});

export const mapToDeleteAreaModel = (
	data: DeleteAreaDataResponse,
): DeleteArea => ({
	metadata: data.metadata,
});
