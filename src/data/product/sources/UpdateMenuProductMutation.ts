import Post from '@/data/common/api/post';
import {
	UpdateProductInput,
	UpdateProductResponse,
} from '@/domain/product/repositories/UpdateMenuProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const UpdateProduct = async (
	input: UpdateProductInput,
): Promise<Response<UpdateProductResponse>> => {
	const {payload, productId} = input;

	const response = await Post({
		endpoint: `/product-service/product/update/${productId}`,
		data: payload,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateProductMutation = (
	options: UseMutationOptions<
		Response<UpdateProductResponse>,
		AxiosError<Response>,
		UpdateProductInput
	>,
) =>
	useMutation({
		mutationFn: UpdateProduct,
		...options,
	});
