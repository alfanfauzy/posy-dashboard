import {GeneralSettings} from '@/domain/outlet/models/GeneralSettings';
import {UpdateGeneralSettings} from '@/domain/outlet/repositories/UpdateGeneralSettingsRepository';

import {GetGeneralSettingsDataResponse} from '../types/GetGeneralSettingsType';
import {UpdateGeneralSettingsDataResponse} from '../types/UpdateGeneralSettingsType';

export const mapToGeneralSettingsModel = (
	datas: GetGeneralSettingsDataResponse,
): GeneralSettings => ({
	use_open_shift: datas.general_setting.use_open_shift,
	use_digital_menu: datas.general_setting.use_digital_menu,
	updated_at: datas.general_setting.updated_at.seconds,
	updated_by: datas.general_setting.updated_by,
});

export const mapToUpdateGeneralSettingsModel = (
	data: UpdateGeneralSettingsDataResponse,
): UpdateGeneralSettings => ({
	metadata: {
		updated_at: data.metadata.updated_at.seconds,
	},
	restaurant_outlet_uuid: data.restaurant_outlet_uuid,
});
