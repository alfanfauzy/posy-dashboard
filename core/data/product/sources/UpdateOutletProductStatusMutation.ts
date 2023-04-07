import {UpdateOutletProductStatusInput} from '@/domain/product/repositories/UpdateOutletProductStatusRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import Post from 'api/post';
import {AxiosError} from 'axios';

import {UpdateOutletProductStatusDataResponse} from '../types/OutletProduct';

const UpdateOutletProductStatus = async (
	input: UpdateOutletProductStatusInput,
): Promise<Response<UpdateOutletProductStatusDataResponse>> => {
	const response = await Post({
		endpoint: `/product-service/product-outlet/update-status`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateOutletProductStatusMutation = (
	options: UseMutationOptions<
		Response<UpdateOutletProductStatusDataResponse>,
		AxiosError<Response>,
		UpdateOutletProductStatusInput
	>,
) =>
	useMutation({
		mutationFn: UpdateOutletProductStatus,
		...options,
	});
