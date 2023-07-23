import {GetListProductDataResponse} from '@/data/product/types/MasterProduct';
import {useGetMasterProductsUsecase} from '@/data/product/usecases/GetMasterProductsUsecase';
import {
	GetMasterProductsInput,
	GetMasterProductsResult,
} from '@/domain/product/repositories/GetMasterProductsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetMasterProductsViewModel = (
	input: GetMasterProductsInput,
	options?: UseQueryOptions<Response<DataList<GetListProductDataResponse>>>,
): GetMasterProductsResult => {
	const result = useGetMasterProductsUsecase(input, options);

	return result;
};
