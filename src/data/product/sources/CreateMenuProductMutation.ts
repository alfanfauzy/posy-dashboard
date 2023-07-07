import Post from '@/data/common/api/post';
import {
	CreateProductInput,
	CreateProductResponse,
} from '@/domain/product/repositories/CreateMenuProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const CreateProduct = async (
	input: CreateProductInput,
): Promise<Response<CreateProductResponse>> => {
	const response = await Post({
		endpoint: `/product-service/product/create`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateProductMutation = (
	options: UseMutationOptions<
		Response<CreateProductResponse>,
		AxiosError<Response>,
		CreateProductInput
	>,
) =>
	useMutation({
		mutationFn: CreateProduct,
		...options,
	});
