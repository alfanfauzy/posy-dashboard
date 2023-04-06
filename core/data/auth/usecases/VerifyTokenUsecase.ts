import {
	VerifyTokenInput,
	VerifyTokenResult,
} from '@/domain/auth/repositories/VerifyTokenRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToVerifyTokenModel} from '../mappers/AuthMapper';
import {useVerifyTokenQuery} from '../sources/VerifyTokenQuery';
import {VerifyTokenDataResponse} from '../types';

export const useVerifyTokenUsecase = (
	input: VerifyTokenInput,
	options?: UseQueryOptions<Response<VerifyTokenDataResponse>>,
): VerifyTokenResult => {
	const {data, ...rest} = useVerifyTokenQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToVerifyTokenModel(data.data);

		return {
			data: dataMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
