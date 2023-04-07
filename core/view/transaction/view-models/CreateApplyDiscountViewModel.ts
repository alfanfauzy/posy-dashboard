import {MutationOptions} from '@/data/common/types';
import {useCreateApplyDiscountUsecase} from '@/data/transaction/usecases/CreateApplyDiscountUsecase';
import {CreateApplyDiscountRepository} from '@/domain/transaction/repositories/CreateApplyDiscountRepository';

export const useCreateApplyDiscountViewModel = (
	options: MutationOptions,
): CreateApplyDiscountRepository => {
	const result = useCreateApplyDiscountUsecase(options);

	return result;
};
