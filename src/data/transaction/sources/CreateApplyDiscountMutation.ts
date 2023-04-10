import Post from '@/data/common/api/post';
import {CreateApplyDiscountInput} from '@/domain/transaction/repositories/CreateApplyDiscountRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreateApplyDiscountDataResponse} from '../types/CreateApplyDiscountType';

const CreateApplyDiscount = async (
	input: CreateApplyDiscountInput,
): Promise<Response<CreateApplyDiscountDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/payment/apply-discount/${input.transaction_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateApplyDiscountMutation = (
	options: UseMutationOptions<
		Response<CreateApplyDiscountDataResponse>,
		AxiosError<Response>,
		CreateApplyDiscountInput
	>,
) =>
	useMutation({
		mutationFn: CreateApplyDiscount,
		...options,
	});
