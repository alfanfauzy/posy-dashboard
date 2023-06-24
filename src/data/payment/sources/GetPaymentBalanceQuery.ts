import Get from '@/data/common/api/get';
import {GetPaymentBalanceResponse} from '@/data/payment/types/index';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const GetPaymentBalance = async (): Promise<
	Response<GetPaymentBalanceResponse>
> => {
	try {
		const response = await Get({
			endpoint: `/payment-service/payment-account/get-balance
            `,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentBalanceQuery = (
	options?: UseQueryOptions<Response<GetPaymentBalanceResponse>>,
) =>
	useQuery<Response<GetPaymentBalanceResponse>>(
		['payment-balance'],
		GetPaymentBalance,
		{
			...options,
			refetchOnWindowFocus: false,
		},
	);
