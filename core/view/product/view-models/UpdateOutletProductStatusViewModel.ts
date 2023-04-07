import {MutationOptions} from '@/data/common/types';
import {useUpdateOutletProductStatusUsecase} from '@/data/product/usecases/UpdateOutletProductStatusUsecase';
import {UpdateOutletProductStatusRepository} from '@/domain/product/repositories/UpdateOutletProductStatusRepository';

export const useUpdateOutletProductStatusViewModel = (
	options: MutationOptions,
): UpdateOutletProductStatusRepository => {
	const result = useUpdateOutletProductStatusUsecase(options);

	return result;
};
