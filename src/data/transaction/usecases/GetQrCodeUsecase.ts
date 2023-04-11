import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	GetQrCodeInput,
	GetQrCodeRepository,
} from '@/domain/transaction/repositories/GetQrCodeRepository';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {mapToQrCodeModel} from '../mappers/TransactionMapper';
import {useGetQrCodeMutation} from '../sources/GetQrCodeMutation';

export const useGetQrCodeUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): GetQrCodeRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useGetQrCodeMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToQrCodeModel(dataSuccess.data), ...args);
				enqueueSnackbar({
					message: 'Get Qr code Successfully',
					variant: 'success',
				});
			}
		},
		onError: (dataError, ...args) => {
			if (dataError) {
				const err = mapToBaseError(dataError);
				onError?.(err, ...args);
				enqueueSnackbar({
					message: err.message,
					variant: 'error',
				});
			}
		},
		...options,
	});

	const getQrCode = (input: GetQrCodeInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			getQrCode,
			data: mapToQrCodeModel(data?.data),
			error,
			...rest,
		};
	}

	return {
		getQrCode,
		data: undefined,
		error,
		...rest,
	};
};
