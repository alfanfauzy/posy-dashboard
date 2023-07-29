import {UpdatedAt} from '@/data/common/types/metadata';

export type GetGeneralSettingsDataResponse = {
	general_setting: {
		use_digital_menu: boolean;
		use_open_shift: boolean;
		updated_at: UpdatedAt;
		updated_by: string;
	};
};
