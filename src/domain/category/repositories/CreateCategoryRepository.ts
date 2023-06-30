import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateCategoryInput = {
	category_name: string;
	is_active: boolean;
};

export type CreateCategoryResponse = {uuid: string; metadata: Metadata};

export type CreateCategoryResult = ResultMutation<null | undefined>;

export type CreateCategoryRepository = {
	createCategory(input: CreateCategoryInput): void;
} & CreateCategoryResult;
