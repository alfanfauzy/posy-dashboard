import Post from '@/data/common/api/post';
import {CreateOrderManualInput} from '@/domain/order/repositories/CreateOrderManualRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreateOrderManualDataResponse} from '../types';

const CreateOrderManual = async (
	input: CreateOrderManualInput,
): Promise<Response<CreateOrderManualDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/order/create`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateOrderManualMutation = (
	options: UseMutationOptions<
		Response<CreateOrderManualDataResponse>,
		AxiosError<Response>,
		CreateOrderManualInput
	>,
) =>
	useMutation({
		mutationFn: CreateOrderManual,
		...options,
	});
