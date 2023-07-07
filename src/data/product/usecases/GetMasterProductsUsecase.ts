import {
	GetMasterProductsInput,
	GetMasterProductsResult,
} from '@/domain/product/repositories/GetMasterProductsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToMasterProductModel} from '../mappers/ProductMapper';
import {useGetMasterProductsQuery} from '../sources/GetMasterProductsMutation';
import {GetListProductDataResponse} from '../types/MasterProduct';

export const useGetMasterProductsUsecase = (
	input: GetMasterProductsInput,
	options?: UseQueryOptions<Response<DataList<GetListProductDataResponse>>>,
): GetMasterProductsResult => {
	const {data, ...rest} = useGetMasterProductsQuery(input, options);

	if (data?.data?.objs.map) {
		const dataMapper = mapToMasterProductModel(data.data.objs);

		return {
			data: dataMapper,
			pagination: {
				curr_page: data.data.curr_page,
				per_page: data.data.per_page,
				total_objs: data.data.total_objs,
				total_page: data.data.total_page,
			},
			...rest,
		};
	}

	return {
		data: undefined,
		pagination: undefined,
		...rest,
	};
};
