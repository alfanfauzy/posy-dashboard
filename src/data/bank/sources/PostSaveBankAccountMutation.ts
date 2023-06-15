import Post from '@/data/common/api/post';
import {SaveBankAccountResponse} from '@/domain/bank/models';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const CreateSaveBankAccount = async (
	payload: PayloadSaveBankAccount,
): Promise<Response<SaveBankAccountResponse>> => {
	try {
		const response = await Post({
			endpoint: `/payment-service/bank/save-account`,
			data: payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
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
