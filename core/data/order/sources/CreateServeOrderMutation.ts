import {CreateServeOrderInput} from '@/domain/order/repositories/CreateServeOrderRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import Post from 'api/post';
import {AxiosError} from 'axios';

import {CreateServeOrderDataResponse} from '../types/CreateServeOrderType';

const CreateServeOrder = async (
	input: CreateServeOrderInput,
): Promise<Response<CreateServeOrderDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/order/serve/${input.order_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateServeOrderMutation = (
	options: UseMutationOptions<
		Response<CreateServeOrderDataResponse>,
		AxiosError<Response>,
		CreateServeOrderInput
	>,
) =>
	useMutation({
		mutationFn: CreateServeOrder,
		...options,
	});
