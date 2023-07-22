import Post from '@/data/common/api/post';
import {SaveBankAccountResponse} from '@/domain/bank/models';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/CreateSaveBankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const CreateSaveBankAccount = async (
	payload: PayloadSaveBankAccount,
): Promise<Response<SaveBankAccountResponse>> => {
	const response = await Post({
		endpoint: `/payment-service/bank/save-account`,
		data: payload,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateSaveBankAccountMutation = (
	options?: UseMutationOptions<
		Response<SaveBankAccountResponse>,
		AxiosError<Response>,
		PayloadSaveBankAccount
	>,
) =>
	useMutation({
		mutationFn: CreateSaveBankAccount,
		...options,
	});
