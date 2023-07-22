import {GetCheckBankResponse} from '@/data/bank/types';
import Post from '@/data/common/api/post';
import {PayloadBankCheck} from '@/domain/bank/repositories/CreateCheckBankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const GetCheckBank = async (
	payload: PayloadBankCheck,
): Promise<Response<GetCheckBankResponse>> => {
	try {
		const response = await Post({
			endpoint: `/payment-service/bank/check-account`,
			data: payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateCheckBankMutation = (
	options?: UseMutationOptions<
		Response<GetCheckBankResponse>,
		AxiosError<Response>,
		PayloadBankCheck
	>,
) =>
	useMutation({
		mutationFn: GetCheckBank,
		...options,
	});
