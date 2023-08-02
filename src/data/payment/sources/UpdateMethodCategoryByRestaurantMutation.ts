import Post from '@/data/common/api/post';
import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {PaymentMethodCategoryByRestaurantPayload} from '@/domain/payment/models';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const UpdatePaymentMethodCategoryByRestaurantService = async (
	param: PaymentMethodCategoryByRestaurantPayload,
): Promise<Response<UpdatePaymentMethodCategoryResponse>> => {
	const {payload, payment_method_uuid} = param;
	try {
		const response = await Post({
			endpoint: `/order-service/v2/payment-method/update/${payment_method_uuid}`,
			data: payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdatePaymentMethodCategoryByRestaurantMutation = (
	options?: UseMutationOptions<
		Response<UpdatePaymentMethodCategoryResponse>,
		AxiosError<Response>,
		PaymentMethodCategoryByRestaurantPayload
	>,
) =>
	useMutation({
		mutationFn: UpdatePaymentMethodCategoryByRestaurantService,
		...options,
	});
