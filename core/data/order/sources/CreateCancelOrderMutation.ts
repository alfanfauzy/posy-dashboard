import {MutationOptions} from '@/data/common/types';
import {CreateCancelOrderInput} from '@/domain/order/repositories/CreateCancelOrderRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

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
	options?: MutationOptions<CreateCancelOrderDataResponse>,
) =>
	useMutation({
		mutationFn: (input: CreateCancelOrderInput) => CreateCancelOrder(input),
		...options,
	});
