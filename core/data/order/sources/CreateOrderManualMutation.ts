import {MutationOptions} from '@/data/common/types';
import {CreateOrderManualInput} from '@/domain/order/repositories/CreateOrderManualRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

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
	options?: MutationOptions<CreateOrderManualDataResponse>,
) =>
	useMutation({
		mutationFn: (input: CreateOrderManualInput) => CreateOrderManual(input),
		...options,
	});
