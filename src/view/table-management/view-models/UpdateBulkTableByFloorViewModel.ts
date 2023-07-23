import {MutationOptions} from '@/data/common/types';
import {useUpdateBulkTableByFloorUsecase} from '@/data/table/usecases/UpdateBulkTableByFloorUsecase';
import {UpdateBulkTableByFloorRepository} from '@/domain/table/repositories/UpdateBulkTableByFloorRepository';

export const useUpdateBulkTableByFloorViewModel = (
	options: MutationOptions,
): UpdateBulkTableByFloorRepository => {
	const result = useUpdateBulkTableByFloorUsecase(options);

	return result;
};
