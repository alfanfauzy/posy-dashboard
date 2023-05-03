import {DownloadTransactionReports} from '@/domain/report/repositories/DownloadReportsRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {store} from '@/view/common/store';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';

export const GetTransactionReportsQueryKey =
	'transaction-reports/download' as const;

const GetDownloadTransactionReports = async (
	input?: DownloadTransactionReports,
): Promise<Response<string>> => {
	const {token} = store.getState().auth.authData;

	const response = await axios.post(
		`/order-service/transaction/export/excel`,
		input,
		{
			headers: {
				token: token,
			},
			responseType: 'arraybuffer',
		},
	);

	return {
		code: response?.status,
		data: response.data,
		message: response?.statusText,
		more_info: response?.statusText,
	};
};

export const useGetDownloadTransactionReportsMutation = (
	options?: UseMutationOptions<Response<string>, AxiosError<Response>, any>,
) =>
	useMutation({
		mutationFn: GetDownloadTransactionReports,
		...options,
	});
