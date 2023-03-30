import {MutationOptions} from '@/data/common/types';
import {UpdateOutletProductInput} from '@/domain/product/repositories/UpdateOutletProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

import {UpdateOutletProductDataResponse} from '../types/OutletProduct';

const UpdateOutletProduct = async (
	input: UpdateOutletProductInput,
): Promise<Response<UpdateOutletProductDataResponse>> => {
	const response = await Post({
		endpoint: `/product-service/product-outlet/update`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateOutletProductMutation = (
	options?: MutationOptions<UpdateOutletProductDataResponse>,
) =>
	useMutation({
		mutationFn: UpdateOutletProduct,
		...options,
	});
