import {ResultQuery} from '@/domain/vo/BaseResponse';

import {GeneralSettings} from '../models/GeneralSettings';

export type GetGeneralSettingsInput = {
	restaurant_outlet_uuid: string;
};

export type GetGeneralSettingsResult = ResultQuery<GeneralSettings | undefined>;
