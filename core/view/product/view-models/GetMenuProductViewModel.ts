import {GetMenuProductDataResponse} from '@/data/product/types/MenuProduct';
import {useGetMenuProductUsecase} from '@/data/product/usecases/GetMenuProductUsecase';
import {
	GetMenuProductInput,
	GetMenuProductResult,
} from '@/domain/product/repositories/ProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetMenuProductViewModel = (
	input: GetMenuProductInput,
	options?: UseQueryOptions<Response<GetMenuProductDataResponse>>,
): GetMenuProductResult => {
	const result = useGetMenuProductUsecase(input, options);

	return result;
};
