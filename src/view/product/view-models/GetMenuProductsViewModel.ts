import {GetMenuProductsDataResponse} from '@/data/product/types/MenuProduct';
import {useGetMenuProductsUsecase} from '@/data/product/usecases/GetMenuProductsUsecase';
import {
	GetMenuProductsInput,
	GetMenuProductsResult,
} from '@/domain/product/repositories/GetMenuProductsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetMenuProductsViewModel = (
	input: GetMenuProductsInput,
	options?: UseQueryOptions<Response<DataList<GetMenuProductsDataResponse>>>,
): GetMenuProductsResult => {
	const result = useGetMenuProductsUsecase(input, options);

	return result;
};
