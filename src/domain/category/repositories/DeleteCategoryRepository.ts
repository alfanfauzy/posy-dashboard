import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CategoryId = string;

export type DeleteCategoryResponse = {uuid: string; metadata: Metadata};

export type DeleteCategoryResult = ResultMutation<null | undefined>;

export type DeleteCategoryRepository = {
	deleteCategory(input: CategoryId): void;
} & DeleteCategoryResult;
