import {MutationOptions} from '@/data/common/types';
import {UpdateOutletProductDataResponse} from '@/data/product/types/OutletProduct';
import {useUpdateOutletProductUsecase} from '@/data/product/usecases/UpdateOutletProductUsecase';
import {UpdateOutletProductRepository} from '@/domain/product/repositories/UpdateOutletProductRepository';

export const useUpdateOutletProductViewModel = (
	options?: MutationOptions<UpdateOutletProductDataResponse>,
): UpdateOutletProductRepository => {
	const result = useUpdateOutletProductUsecase(options);

	return result;
};
