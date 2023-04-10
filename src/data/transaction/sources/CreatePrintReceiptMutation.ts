import Post from '@/data/common/api/post';
import {CreatePrintReceiptInput} from '@/domain/transaction/repositories/CreatePrintReceiptRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreatePrintReceiptDataResponse} from '../types/CreatePrintReceiptType';

const CreatePrintReceipt = async (
	input: CreatePrintReceiptInput,
): Promise<Response<CreatePrintReceiptDataResponse>> => {
	const response = await Post({
		endpoint: `/order-service/transaction/payment/get-receipt/${input?.transaction_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreatePrintReceiptMutation = (
	options: UseMutationOptions<
		Response<CreatePrintReceiptDataResponse>,
		AxiosError<Response>,
		CreatePrintReceiptInput
	>,
) =>
	useMutation({
		mutationFn: CreatePrintReceipt,
		...options,
	});
