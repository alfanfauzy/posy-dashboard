import {MutationOptions} from '@/data/common/types';
import {CreateServeOrderInput} from '@/domain/order/repositories/CreateServeOrderRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

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
	options?: MutationOptions<CreateServeOrderDataResponse>,
) =>
	useMutation({
		mutationFn: (input: CreateServeOrderInput) => CreateServeOrder(input),
		...options,
	});
