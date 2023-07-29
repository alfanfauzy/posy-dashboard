import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type UpdateGeneralSettingsInput = {
	restaurant_outlet_uuid: string;
	use_digital_menu?: boolean;
	use_open_shift?: boolean;
};

export type UpdateGeneralSettings = {
	restaurant_outlet_uuid: string;
	metadata: Metadata;
};

export type UpdateGeneralSettingsResult = ResultMutation<
	UpdateGeneralSettings | undefined
>;

export type UpdateGeneralSettingsRepository = {
	UpdateGeneralSettings(input: UpdateGeneralSettingsInput): void;
} & UpdateGeneralSettingsResult;
