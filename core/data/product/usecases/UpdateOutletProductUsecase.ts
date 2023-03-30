import {MutationOptions} from '@/data/common/types';
import {
	UpdateOutletProductDefaultInput,
	UpdateOutletProductRepository,
} from '@/domain/product/repositories/UpdateOutletProductRepository';
import {ValidationSchemaProductOutletType} from '@/view/product/schemas/update-product';

import {
	mapToUpdateOutletProductModel,
	mapToUpdateOutletProductPayload,
} from '../mappers/ProductMapper';
import {useUpdateOutletProductMutation} from '../sources/UpdateOutletProductMutation';
import {UpdateOutletProductDataResponse} from '../types/OutletProduct';

export const useUpdateOutletProductUsecase = (
	options?: MutationOptions<UpdateOutletProductDataResponse>,
): UpdateOutletProductRepository => {
	const {mutate, data, ...rest} = useUpdateOutletProductMutation(options);

	const updateOutletProduct = (
		input: ValidationSchemaProductOutletType,
		default_input: UpdateOutletProductDefaultInput,
	) => {
		const mappedPayload = mapToUpdateOutletProductPayload(input, default_input);
		mutate(mappedPayload);
	};

	if (data?.data) {
		return {
			updateOutletProduct,
			data: mapToUpdateOutletProductModel(data?.data),
			...rest,
		};
	}

	return {
		updateOutletProduct,
		data: undefined,
		...rest,
	};
};
