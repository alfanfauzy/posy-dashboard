import Post from '@/data/common/api/post';
import {DeleteAreaInput} from '@/domain/area/repositories/DeleteAreaRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {DeleteAreaDataResponse} from '../types/DeleteAreaType';

const DeleteArea = async (
	input: DeleteAreaInput,
): Promise<Response<DeleteAreaDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/floor/delete/${input.area_uuid}?restaurant_outlet_uuid=${input.restaurant_outlet_uuid}`,
		data: {},
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useDeleteAreaMutation = (
	options: UseMutationOptions<
		Response<DeleteAreaDataResponse>,
		AxiosError<Response>,
		DeleteAreaInput
	>,
) =>
	useMutation({
		mutationFn: DeleteArea,
		...options,
	});
