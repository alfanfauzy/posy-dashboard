import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {PaymentWithdrawPayload} from '@/domain/payment/models';
import {CreatePaymentWithdrawRepository} from '@/domain/payment/repositories/PaymentRepositories';
import {BaseError} from '@/domain/vo/BaseError';
import {useSnackbar} from 'notistack';

import {useCreatePaymentWithdrawMutation} from '../sources/CreatePaymentWithdrawMutation';

export const useCreatePaymentWithdrawUsecase = ({
	onSuccess,
	onError,
	...options
}: MutationOptions): CreatePaymentWithdrawRepository => {
	let error: BaseError | null = null;
	const {enqueueSnackbar} = useSnackbar();

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useCreatePaymentWithdrawMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(dataSuccess, ...args);
			}
		},
		onError: (dataError, ...args) => {
			if (dataError) {
				const err = mapToBaseError(dataError);
				onError?.(err, ...args);

				enqueueSnackbar({
					message: `${err.title} : ${err.message}`,
					variant: 'error',
				});
			}
		},
		...options,
	});

	const createPaymentWithdraw = (payload: PaymentWithdrawPayload) => {
		mutate(payload);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			createPaymentWithdraw,
			data: data?.data,
			error,
			...rest,
		};
	}

	return {
		createPaymentWithdraw,
		data: undefined,
		error,
		...rest,
	};
};
