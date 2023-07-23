import {useUpdateAreaUsecase} from '@/data/area/usecases/UpdateAreaUsecase';
import {MutationOptions} from '@/data/common/types';
import {UpdateAreaRepository} from '@/domain/area/repositories/UpdateAreaRepository';

export const useUpdateAreaViewModel = (
	options: MutationOptions,
): UpdateAreaRepository => {
	const result = useUpdateAreaUsecase(options);

	return result;
};
