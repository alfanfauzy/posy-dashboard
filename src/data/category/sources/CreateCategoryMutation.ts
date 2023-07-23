import Post from '@/data/common/api/post';
import {
	CreateCategoryInput,
	CreateCategoryResponse,
} from '@/domain/category/repositories/CreateCategoryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

const CreateCategory = async (
	input: CreateCategoryInput,
): Promise<Response<CreateCategoryResponse>> => {
	const response = await Post({
		endpoint: `/product-service/category/create`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateCategoryMutation = (
	options: UseMutationOptions<
		Response<CreateCategoryResponse>,
		AxiosError<Response>,
		CreateCategoryInput
	>,
) =>
	useMutation({
		mutationFn: CreateCategory,
		...options,
	});
