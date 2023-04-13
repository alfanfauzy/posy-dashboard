import {mapToBaseError} from '@/data/common/mappers/ErrorMapper';
import {MutationOptions} from '@/data/common/types';
import {
	RefreshTokenInput,
	RefreshTokenRepository,
} from '@/domain/auth/repositories/RefreshTokenRepository';
import {BaseError} from '@/domain/vo/BaseError';

import {mapToRefreshTokenModel} from '../mappers/AuthMapper';
import {useRefreshTokenMutation} from '../sources/RefreshTokenMutation';

export const useRefreshTokenUsecase = ({
	onError,
	onSuccess,
	...options
}: MutationOptions): RefreshTokenRepository => {
	let error: BaseError | null = null;

	const {
		mutate,
		data,
		error: _error,
		...rest
	} = useRefreshTokenMutation({
		onSuccess: (dataSuccess, ...args) => {
			if (dataSuccess) {
				onSuccess?.(mapToRefreshTokenModel(dataSuccess?.data), ...args);
			}
		},
		onError: (dataError, ...args) => {
			if (dataError) {
				onError?.(mapToBaseError(dataError), ...args);
			}
		},
		...options,
	});

	const RefreshToken = (input: RefreshTokenInput) => {
		mutate(input);
	};

	if (_error) {
		error = mapToBaseError(_error);
	}

	if (data?.data) {
		return {
			RefreshToken,
			error,
			data: mapToRefreshTokenModel(data?.data),
			...rest,
		};
	}

	return {
		RefreshToken,
		error,
		data: undefined,
		...rest,
	};
};
