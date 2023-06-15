import {useSaveBankAccountUsecase} from '@/data/bank/usecases/PostSaveBankAccountUsecase';
import {SaveBankAccountResponse} from '@/domain/bank/models';
import {
	PayloadSaveBankAccount,
	SaveBankAccountRepository,
} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useSaveAccountBankViewModal = (
	options?: UseMutationOptions<
		Response<SaveBankAccountResponse>,
		AxiosError<Response>,
		PayloadSaveBankAccount
	>,
): SaveBankAccountRepository => {
	const result = useSaveBankAccountUsecase(options);

	return result;
};
