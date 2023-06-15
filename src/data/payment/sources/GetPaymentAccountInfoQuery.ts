import Get from '@/data/common/api/get';
import {GetPaymentAccountInfoResponse} from '@/data/payment/types/index';
import {Response} from '@/domain/vo/BaseResponse';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const GetPaymentAccountInfo = async (): Promise<
	Response<GetPaymentAccountInfoResponse>
> => {
	try {
		const response = await Get({
			endpoint: `/payment-service/payment-account/get-info
            `,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentAccountInfoQuery = (
	options?: UseQueryOptions<Response<GetPaymentAccountInfoResponse>>,
) =>
	useQuery<Response<GetPaymentAccountInfoResponse>>(
		['payment-account-info'],
		() => GetPaymentAccountInfo(),
		{
			...options,
			refetchOnWindowFocus: false,
		},
	);
