import Post from '@/data/common/api/post';
import {
	CategoryId,
	DeleteCategoryResponse,
} from '@/domain/category/repositories/DeleteCategoryRepository';
import {UpdateCategoryResponse} from '@/domain/category/repositories/UpdateCategoryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const DeleteCategory = async (
	categoryId: CategoryId,
): Promise<Response<UpdateCategoryResponse>> => {
	const response = await Post({
		endpoint: `/product-service/category/delete/${categoryId}`,
		data: '',
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useDeleteCategoryMutation = (
	options: UseMutationOptions<
		Response<DeleteCategoryResponse>,
		AxiosError<Response>,
		CategoryId
	>,
) =>
	useMutation({
		mutationFn: DeleteCategory,
		...options,
	});
