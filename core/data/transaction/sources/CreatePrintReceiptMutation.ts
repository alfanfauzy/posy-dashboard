import {MutationOptions} from '@/data/common/types';
import {CreatePrintReceiptInput} from '@/domain/transaction/repositories/CreatePrintReceiptRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation} from '@tanstack/react-query';
import Post from 'api/post';

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
	options?: MutationOptions<CreatePrintReceiptDataResponse>,
) =>
	useMutation({
		mutationFn: (input: CreatePrintReceiptInput) => CreatePrintReceipt(input),
		...options,
	});
