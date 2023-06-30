import Post from '@/data/common/api/post';
import {
	UpdateCategoryInput,
	UpdateCategoryResponse,
} from '@/domain/category/repositories/UpdateCategoryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const UpdateCategory = async (
	input: UpdateCategoryInput,
): Promise<Response<UpdateCategoryResponse>> => {
	const {categoryId, payload} = input;

	const response = await Post({
		endpoint: `/product-service/category/update/${categoryId}`,
		data: payload,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateCategoryMutation = (
	options: UseMutationOptions<
		Response<UpdateCategoryResponse>,
		AxiosError<Response>,
		UpdateCategoryInput
	>,
) =>
	useMutation({
		mutationFn: UpdateCategory,
		...options,
	});
