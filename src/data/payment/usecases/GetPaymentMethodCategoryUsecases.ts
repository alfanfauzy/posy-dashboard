import {mapToPaymentMethodCategoryModel} from '@/data/payment/mappers/PaymentMethodMapper';
import {useGetPaymentMethodCategoryQuery} from '@/data/payment/sources/GetPaymentMethodCategory';
import {GetPaymentMethodCategoryListResponse} from '@/data/payment/types';
import {
	GetFilterPaymentMethodCategory,
	GetPaymentMethodCategorysResult,
} from '@/domain/payment/repositories/PaymentRepositories';
import {DataList, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetPaymentMethodCategoryUsecase = (
	input?: GetFilterPaymentMethodCategory,
	options?: UseQueryOptions<
		Response<DataList<GetPaymentMethodCategoryListResponse>>
	>,
): GetPaymentMethodCategorysResult => {
	const {data, ...rest} = useGetPaymentMethodCategoryQuery(input, options);

	if (data?.data.objs) {
		const paymentMethodCategoryMapper = mapToPaymentMethodCategoryModel(
			data.data.objs,
		);

		return {
			data: paymentMethodCategoryMapper,
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
