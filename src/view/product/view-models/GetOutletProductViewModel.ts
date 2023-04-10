import {GetOutletProductDataResponse} from '@/data/product/types/OutletProduct';
import {useGetOutletProductUsecase} from '@/data/product/usecases/GetOutletProductUsecase';
import {
	GetOutletProductInput,
	GetOutletProductResult,
} from '@/domain/product/repositories/GetOutletProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetOutletProductViewModel = (
	input: GetOutletProductInput,
	options?: UseQueryOptions<Response<GetOutletProductDataResponse>>,
): GetOutletProductResult => {
	const result = useGetOutletProductUsecase(input, options);

	return result;
};
