import {OutletSelection} from '@/domain/outlet/models';
import {OutletDetail} from '@/domain/outlet/models/GetOutletDetailModel';
import {OutlerUsers} from '@/domain/outlet/repositories/GetOutletUserRepository';

import {GetOutletSelectionDataResponse} from '../types';
import {GetOutletDetailResponse} from '../types/GetOutletDetailType';
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

export const mapToOutletDetailModel = (
	datas: GetOutletDetailResponse,
): OutletDetail => ({
	address: datas.outlet.address,
	email: datas.outlet.email,
	latitude: datas.outlet.latitude,
	logo_image_url: datas.outlet.logo_image_url,
	longitude: datas.outlet.longitude,
	uuid: datas.outlet.uuid,
	restaurant_uuid: datas.outlet.restaurant_uuid,
	restaurant_code: datas.outlet.restaurant_code,
	restaurant_name: datas.outlet.restaurant_name,
	restaurant_email: datas.outlet.restaurant_email,
	outlet_name: datas.outlet.outlet_name,
	outlet_code: datas.outlet.outlet_code,
	region: {
		province_id: datas.outlet.region.province_id,
		province_name: datas.outlet.region.province_name,
		city_id: datas.outlet.region.city_id,
		city_name: datas.outlet.region.city_name,
		district_id: datas.outlet.region.district_id,
		district_name: datas.outlet.region.district_name,
		subdistrict_id: datas.outlet.region.subdistrict_id,
		subdistrict_name: datas.outlet.region.subdistrict_name,
		postal_code: datas.outlet.region.postal_code,
	},
	phone: datas.outlet.phone,
	metadata: {
		created_at: datas.outlet.metadata.created_at.nanos,
		updated_at: datas.outlet.metadata.created_at.nanos,
	},
});
