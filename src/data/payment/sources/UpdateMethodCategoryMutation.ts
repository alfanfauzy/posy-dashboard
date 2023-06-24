import Post from '@/data/common/api/post';
import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const UpdatePaymentMethodCategoryService = async (
	payload: PaymentMethodCategoryPayload,
): Promise<Response<UpdatePaymentMethodCategoryResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-order-service/internal/payment-method/update/status`,
			data: payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdatePaymentMethodCategoryMutation = (
	options?: UseMutationOptions<
		Response<UpdatePaymentMethodCategoryResponse>,
		AxiosError<Response>,
		PaymentMethodCategoryPayload
	>,
) =>
	useMutation({
		mutationFn: UpdatePaymentMethodCategoryService,
		...options,
	});
