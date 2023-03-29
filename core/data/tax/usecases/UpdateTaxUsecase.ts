import {MutationOptions} from '@/data/common/types';
import {
	UpdateTaxInput,
	UpdateTaxRepository,
} from '@/domain/tax/repositories/TaxRepository';

import {mapToUpdateTaxModel} from '../mappers/TaxMapper';
import {useUpdateTaxMutation} from '../sources/UpdateTaxMutation';
import {UpdateTaxDataResponse} from '../types';

export const useUpdateTaxUsecase = (
	options?: MutationOptions<UpdateTaxDataResponse>,
): UpdateTaxRepository => {
	const {mutate, data, ...rest} = useUpdateTaxMutation(options);

	const updateTax = (input: UpdateTaxInput) => {
		mutate(input);
	};

	if (data?.data) {
		return {
			updateTax,
			data: mapToUpdateTaxModel(data?.data),
			...rest,
		};
	}

	return {
		updateTax,
		data: undefined,
		...rest,
	};
};
