import {usePostCheckBankMutation} from '@/data/bank/sources/PostCheckBankMutation';
import {GetCheckBankResponse} from '@/data/bank/types';
import {PayloadBankCheck} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useCheckBankUsecase = (
	options?: UseMutationOptions<
		Response<GetCheckBankResponse>,
		AxiosError<Response>,
		PayloadBankCheck
	>,
): any => {
	const {mutate, data, ...rest} = usePostCheckBankMutation(options);

	const checkBank = (payload: PayloadBankCheck) => {
		mutate(payload);
	};

	return {
		checkBank,
		data: data?.data,
		...rest,
	};
};
