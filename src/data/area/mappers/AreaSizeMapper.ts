import {AreaSizes} from '@/domain/area/model/AreaSize';

import {GetAreaSizesDataResponse} from '../types/GetAreaSizesType';

export const mapToAreaSizesModel = (
	datas: Array<GetAreaSizesDataResponse>,
): AreaSizes =>
	datas.map(data => ({
		uuid: data.uuid,
		name: data.name,
		height: data.height,
		width: data.width,
	}));
