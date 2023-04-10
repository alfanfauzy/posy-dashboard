import {OutletSelection} from '@/domain/outlet/models';

import {GetOutletSelectionDataResponse} from '../types';

export const mapToOutletSelectionModel = (
	datas: Array<GetOutletSelectionDataResponse>,
): OutletSelection =>
	datas.map(data => ({
		uuid: data.uuid,
		outlet_code: data.outlet_code,
		outlet_name: data.outlet_name,
	}));
