import {GetMasterProductResult} from '@/domain/product/repositories/GetMasterProductRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToMasterProductDetailModel} from '../mappers/ProductMapper';
import {useGetMasterProductQuery} from '../sources/GetMasterProductMutation';
import {GetDetailProductResponse} from '../types/MasterProduct';

export const useGetMasterProductUsecase = (
	input: string,
	options?: UseQueryOptions<Response<GetDetailProductResponse>>,
): GetMasterProductResult => {
	const {data, ...rest} = useGetMasterProductQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToMasterProductDetailModel(data.data);

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
