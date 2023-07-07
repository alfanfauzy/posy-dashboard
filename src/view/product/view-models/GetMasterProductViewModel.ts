import {GetDetailProductResponse} from '@/data/product/types/MasterProduct';
import {useGetMasterProductUsecase} from '@/data/product/usecases/GetMasterProductUsecase';
import {GetMasterProductResult} from '@/domain/product/repositories/GetMasterProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetMasterProductViewModel = (
	input: string,
	options?: UseQueryOptions<Response<GetDetailProductResponse>>,
): GetMasterProductResult => {
	const result = useGetMasterProductUsecase(input, options);

	return result;
};
