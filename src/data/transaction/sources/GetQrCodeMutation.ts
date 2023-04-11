import Get from '@/data/common/api/get';
import {GetQrCodeInput} from '@/domain/transaction/repositories/GetQrCodeRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {GetQrCodeDataResponse} from '../types/GetQrCodeType';

export const GetQrCodeQueryKey = 'transactions/qr-code' as const;

const GetQrCode = async (
	input: GetQrCodeInput,
): Promise<Response<GetQrCodeDataResponse>> => {
	const response = await Get({
		endpoint: `/order-service/transaction/qr-code/${input?.transaction_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useGetQrCodeMutation = (
	options: UseMutationOptions<
		Response<GetQrCodeDataResponse>,
		AxiosError<Response>,
		GetQrCodeInput
	>,
) =>
	useMutation({
		mutationFn: GetQrCode,
		...options,
	});
