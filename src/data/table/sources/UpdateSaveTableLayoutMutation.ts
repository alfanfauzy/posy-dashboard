import Post from '@/data/common/api/post';
import {UpdateSaveTableLayoutInput} from '@/domain/table/repositories/UpdateSaveTableLayoutRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {UpdateSaveTableLayoutDataResponse} from '../types/UpdateSaveTableLayoutType';

const UpdateSaveTableLayout = async (
	input: UpdateSaveTableLayoutInput,
): Promise<Response<UpdateSaveTableLayoutDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/table/save-layout?restaurant_outlet_uuid=${input.restaurant_outlet_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateSaveTableLayoutMutation = (
	options: UseMutationOptions<
		Response<UpdateSaveTableLayoutDataResponse>,
		AxiosError<Response>,
		UpdateSaveTableLayoutInput
	>,
) =>
	useMutation({
		mutationFn: UpdateSaveTableLayout,
		...options,
	});
