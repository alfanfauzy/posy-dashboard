import {NewMetadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateAreaInput = {
	floor_size_uuid: string;
	name: string;
	total_table: number;
	restaurant_outlet_uuid: string;
};

export type CreateArea = {uuid: string; metadata: NewMetadata};

export type CreateAreaResult = ResultMutation<CreateArea | undefined>;

export type CreateAreaRepository = {
	createArea(input: CreateAreaInput): void;
} & CreateAreaResult;
