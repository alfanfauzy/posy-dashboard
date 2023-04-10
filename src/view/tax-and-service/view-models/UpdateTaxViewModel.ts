import {MutationOptions} from '@/data/common/types';
import {useUpdateTaxUsecase} from '@/data/tax/usecases/UpdateTaxUsecase';
import {UpdateTaxRepository} from '@/domain/tax/repositories/TaxRepository';

export const useUpdateTaxViewModel = (
	options: MutationOptions,
): UpdateTaxRepository => {
	const result = useUpdateTaxUsecase(options);

	return result;
};
