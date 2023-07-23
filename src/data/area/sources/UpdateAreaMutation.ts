import Post from '@/data/common/api/post';
import {UpdateAreaInput} from '@/domain/area/repositories/UpdateAreaRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {UpdateAreaDataResponse} from '../types/UpdateAreaType';

const UpdateArea = async (
	input: UpdateAreaInput,
): Promise<Response<UpdateAreaDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/floor/update/${input.floor_area_uuid}?restaurant_outlet_uuid=${input.restaurant_outlet_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateAreaMutation = (
	options: UseMutationOptions<
		Response<UpdateAreaDataResponse>,
		AxiosError<Response>,
		UpdateAreaInput
	>,
) =>
	useMutation({
		mutationFn: UpdateArea,
		...options,
	});
