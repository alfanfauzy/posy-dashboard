import Post from '@/data/common/api/post';
import {DeleteProductResponse} from '@/domain/product/repositories/DeleteMenuProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const DeleteProduct = async (
	productId: string,
): Promise<Response<DeleteProductResponse>> => {
	const response = await Post({
		endpoint: `/product-service/product/delete/${productId}`,
		data: '',
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useDeleteProductMutation = (
	options: UseMutationOptions<
		Response<DeleteProductResponse>,
		AxiosError<Response>,
		string
	>,
) =>
	useMutation({
		mutationFn: DeleteProduct,
		...options,
	});
