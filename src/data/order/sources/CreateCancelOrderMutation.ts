import Post from '@/data/common/api/post';
import {CreateCancelOrderInput} from '@/domain/order/repositories/CreateCancelOrderRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreateCancelOrderDataResponse} from '../types/CreateCancelOrderType';

const CreateCancelOrder = async (
	input: CreateCancelOrderInput,
): Promise<Response<CreateCancelOrderDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/order/cancel/${input.order_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateCancelOrderMutation = (
	options: UseMutationOptions<
		Response<CreateCancelOrderDataResponse>,
		AxiosError<Response>,
		CreateCancelOrderInput
	>,
) =>
	useMutation({
		mutationFn: CreateCancelOrder,
		...options,
	});
