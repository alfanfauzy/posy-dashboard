import {GetTransactionRatingsDataResponse} from '@/data/rating/types/GetTransactionRatingsType';
import {useGetTransactionRatingsUsecase} from '@/data/rating/usecases/GetTransactionRatingsUsecase';
import {
	GetTransactionRatingsInput,
	GetTransactionRatingsResult,
} from '@/domain/rating/repositories/GetTransactionRatingsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetTransactionRatingsViewModel = (
	input: GetTransactionRatingsInput,
	options?: UseQueryOptions<
		Response<DataList<GetTransactionRatingsDataResponse>>
	>,
): GetTransactionRatingsResult => {
	const result = useGetTransactionRatingsUsecase(input, options);

	return result;
};
