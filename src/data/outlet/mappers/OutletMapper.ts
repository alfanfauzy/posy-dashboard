import {OutletSelection} from '@/domain/outlet/models';
import {OutlerUsers} from '@/domain/outlet/repositories/GetOutletUserRepository';

import {GetOutletSelectionDataResponse} from '../types';
import {GetOutletUserDataResponse} from '../types/GetOutletUserType';

export const mapToOutletSelectionModel = (
	datas: Array<GetOutletSelectionDataResponse>,
): OutletSelection =>
	datas.map(data => ({
		uuid: data.uuid,
		outlet_code: data.outlet_code,
		outlet_name: data.outlet_name,
	}));

export const mapToOutletUserModel = (
	datas: Array<GetOutletUserDataResponse>,
): OutlerUsers =>
	datas.map(data => ({
		uuid: data.user_uuid,
		email: data.email,
		full_name: data.fullname,
		phone: data.phone,
	}));
