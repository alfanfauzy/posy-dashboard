import {Area, Areas} from '@/domain/area/model';
import {CreateArea} from '@/domain/area/repositories/CreateAreaRepository';
import {DeleteArea} from '@/domain/area/repositories/DeleteAreaRepository';

import {CreateAreaDataResponse} from '../types/CreateAreaType';
import {DeleteAreaDataResponse} from '../types/DeleteAreaType';
import {GetAreasDataResponse} from '../types/GetAreasType';
import {GetAreaDataResponse} from '../types/GetAreaType';

export const mapToAreasModel = (datas: Array<GetAreasDataResponse>): Areas =>
	datas.map(data => ({
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
	}));

export const mapToAreaModel = (data: GetAreaDataResponse): Area => ({
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
});

export const mapToCreateAreaModel = (
	data: CreateAreaDataResponse,
): CreateArea => ({
	uuid: data.uuid,
	metadata: data.metadata,
});

export const mapToDeleteAreaModel = (
	data: DeleteAreaDataResponse,
): DeleteArea => ({
	metadata: data.metadata,
});
