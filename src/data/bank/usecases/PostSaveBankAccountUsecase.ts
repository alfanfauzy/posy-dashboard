import {useCreateSaveBankAccountMutation} from '@/data/bank/sources/PostSaveBankAccountMutation';
import {SaveBankAccountResponse} from '@/domain/bank/models';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useSaveBankAccountUsecase = (
	options?: UseMutationOptions<
		Response<SaveBankAccountResponse>,
		AxiosError<Response>,
		PayloadSaveBankAccount
	>,
): any => {
	const {mutate, data, ...rest} = useCreateSaveBankAccountMutation(options);

	const saveBankAccount = (payload: PayloadSaveBankAccount) => {
		mutate(payload);
	};

	return {
		saveBankAccount,
		data: data?.data,
		...rest,
	};
};
