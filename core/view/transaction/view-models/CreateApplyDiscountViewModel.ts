import {MutationOptions} from '@/data/common/types';
import {CreateApplyDiscountDataResponse} from '@/data/transaction/types/CreateApplyDiscountType';
import {useCreateApplyDiscountUsecase} from '@/data/transaction/usecases/CreateApplyDiscountUsecase';
import {CreateApplyDiscountRepository} from '@/domain/transaction/repositories/CreateApplyDiscountRepository';

export const useCreateApplyDiscountViewModel = (
	options?: MutationOptions<CreateApplyDiscountDataResponse>,
): CreateApplyDiscountRepository => {
	const result = useCreateApplyDiscountUsecase(options);

	return result;
};
