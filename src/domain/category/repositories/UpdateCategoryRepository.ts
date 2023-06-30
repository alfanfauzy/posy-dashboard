import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type UpdateCategoryInput = {
	categoryId: string;
	payload: {
		category_name: string;
		is_active: boolean;
	};
};

export type UpdateCategoryResponse = {uuid: string; metadata: Metadata};

export type UpdateCategoryResult = ResultMutation<null | undefined>;

export type UpdateCategoryRepository = {
	updateCategory(input: UpdateCategoryInput): void;
} & UpdateCategoryResult;
