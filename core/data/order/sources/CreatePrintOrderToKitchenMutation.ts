import {CreatePrintOrderToKitchenInput} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import Post from 'api/post';
import {AxiosError} from 'axios';

import {CreatePrintOrderToKitchenDataResponse} from '../types/CreatePrintToKitchenType';

const CreatePrintOrderToKitchen = async (
	input: CreatePrintOrderToKitchenInput,
): Promise<Response<CreatePrintOrderToKitchenDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/order/print-to-kitchen`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreatePrintOrderToKitchenMutation = (
	options: UseMutationOptions<
		Response<CreatePrintOrderToKitchenDataResponse>,
		AxiosError<Response>,
		CreatePrintOrderToKitchenInput
	>,
) =>
	useMutation({
		mutationFn: CreatePrintOrderToKitchen,
		...options,
	});
