import Post from '@/data/common/api/post';
import {UpdateTaxInput} from '@/domain/tax/repositories/TaxRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {UpdateTaxDataResponse} from '../types';

const UpdateTax = async (
	input: UpdateTaxInput,
): Promise<Response<UpdateTaxDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/outlet/setting/tax/update`,
		data: {
			...input,
		},
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateTaxMutation = (
	options: UseMutationOptions<
		Response<UpdateTaxDataResponse>,
		AxiosError<Response>,
		UpdateTaxInput
	>,
) =>
	useMutation({
		mutationFn: UpdateTax,
		...options,
	});
