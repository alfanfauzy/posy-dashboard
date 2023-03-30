import {MutationOptions} from '@/data/common/types';
import {UpdateOutletProductStatusDataResponse} from '@/data/product/types/OutletProduct';
import {useUpdateOutletProductStatusUsecase} from '@/data/product/usecases/UpdateOutletProductStatusUsecase';
import {UpdateOutletProductStatusRepository} from '@/domain/product/repositories/UpdateOutletProductStatusRepository';

export const useUpdateOutletProductStatusViewModel = (
	options?: MutationOptions<UpdateOutletProductStatusDataResponse>,
): UpdateOutletProductStatusRepository => {
	const result = useUpdateOutletProductStatusUsecase(options);

	return result;
};
