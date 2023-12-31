import {
	GetMenuProductsInput,
	GetMenuProductsResult,
} from '@/domain/product/repositories/GetMenuProductsRepository';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToMenuProductsModel} from '../mappers/ProductMapper';
import {useGetMenuProductsQuery} from '../sources/GetMenuProductsQuery';
import {GetMenuProductsDataResponse} from '../types/GetMenuProductsType';

export const useGetMenuProductsUsecase = (
	input: GetMenuProductsInput,
	options?: UseQueryOptions<Response<DataList<GetMenuProductsDataResponse>>>,
): GetMenuProductsResult => {
	const {data, ...rest} = useGetMenuProductsQuery(input, options);

	if (data?.data?.objs.map) {
		const dataMapper = mapToMenuProductsModel(data.data.objs);

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
