import Post from '@/data/common/api/post';
import {CreateAreaInput} from '@/domain/area/repositories/CreateAreaRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreateAreaDataResponse} from '../types/CreateAreaType';

const CreateArea = async (
	input: CreateAreaInput,
): Promise<Response<CreateAreaDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/floor/create?restaurant_outlet_uuid=${input.restaurant_outlet_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateAreaMutation = (
	options: UseMutationOptions<
		Response<CreateAreaDataResponse>,
		AxiosError<Response>,
		CreateAreaInput
	>,
) =>
	useMutation({
		mutationFn: CreateArea,
		...options,
	});
