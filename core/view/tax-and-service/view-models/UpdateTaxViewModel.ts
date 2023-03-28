import {MutationOptions} from '@/data/common/types';
import {UpdateTaxDataResponse} from '@/data/tax/types';
import {useUpdateTaxUsecase} from '@/data/tax/usecases/UpdateTaxUsecase';
import {UpdateTaxRepository} from '@/domain/tax/repositories/TaxRepository';

export const useUpdateTaxViewModel = (
	options?: MutationOptions<UpdateTaxDataResponse>,
): UpdateTaxRepository => {
	const result = useUpdateTaxUsecase(options);

	return result;
};
