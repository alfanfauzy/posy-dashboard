import Post from '@/data/common/api/post';
import {UpdateGeneralSettingsInput} from '@/domain/outlet/repositories/UpdateGeneralSettingsRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {UpdateGeneralSettingsDataResponse} from '../types/UpdateGeneralSettingsType';

const UpdateGeneralSettings = async (
	input: UpdateGeneralSettingsInput,
): Promise<Response<UpdateGeneralSettingsDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/outlet/setting/general/update`,
		data: input,
		params: {
			restaurant_outlet_uuid: input.restaurant_outlet_uuid,
		},
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateGeneralSettingsMutation = (
	options: UseMutationOptions<
		Response<UpdateGeneralSettingsDataResponse>,
		AxiosError<Response>,
		UpdateGeneralSettingsInput
	>,
) =>
	useMutation({
		mutationFn: UpdateGeneralSettings,
		...options,
	});
