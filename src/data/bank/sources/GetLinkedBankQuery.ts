import {GetLinkedBankAccountResponse} from '@/data/bank/types';
import Get from '@/data/common/api/get';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const GetLinkedBankAccount = async (): Promise<
	Response<GetLinkedBankAccountResponse>
> => {
	try {
		const response = await Get({
			endpoint: `/payment-service/bank/get-account-info`,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetLinkedBankAccountQuery = (
	options?: UseQueryOptions<Response<GetLinkedBankAccountResponse>>,
) =>
	useQuery<Response<GetLinkedBankAccountResponse>>(
		['linked-bank-account'],
		() => GetLinkedBankAccount(),
		{
			refetchOnWindowFocus: false,
			...options,
		},
	);
