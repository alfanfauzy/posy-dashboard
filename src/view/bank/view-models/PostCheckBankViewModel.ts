import {GetCheckBankResponse} from '@/data/bank/types';
import {useCheckBankUsecase} from '@/data/bank/usecases/PostCheckBankUsecase';
import {
	CheckBankRepository,
	PayloadBankCheck,
} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useCheckBankViewModal = (
	options?: UseMutationOptions<
		Response<GetCheckBankResponse>,
		AxiosError<Response>,
		PayloadBankCheck
	>,
): CheckBankRepository => {
	const result = useCheckBankUsecase(options);

	return result;
};
