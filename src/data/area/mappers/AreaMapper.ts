import {Areas} from '@/domain/area/model';
import {CreateArea} from '@/domain/area/repositories/CreateAreaRepository';

import {CreateAreaDataResponse} from '../types/CreateAreaType';
import {GetAreasDataResponse} from '../types/GetAreasType';

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

export const mapToCreateAreaModel = (
	data: CreateAreaDataResponse,
): CreateArea => ({
	uuid: data.uuid,
	metadata: data.metadata,
});
