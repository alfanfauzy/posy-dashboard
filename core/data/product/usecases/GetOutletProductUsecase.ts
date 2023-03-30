import {
	GetOutletProductInput,
	GetOutletProductResult,
} from '@/domain/product/repositories/GetOutletProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToOutletProductModel} from '../mappers/ProductMapper';
import {useGetOutletProductQuery} from '../sources/GetOutletProductQuery';
import {GetOutletProductDataResponse} from '../types/OutletProduct';

export const useGetOutletProductUsecase = (
	input: GetOutletProductInput,
	options?: UseQueryOptions<Response<GetOutletProductDataResponse>>,
): GetOutletProductResult => {
	const {data, ...rest} = useGetOutletProductQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToOutletProductModel(data.data);

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
