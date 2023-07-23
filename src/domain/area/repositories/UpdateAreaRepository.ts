import {NewMetadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type UpdateAreaInput = {
	name: string;
	restaurant_outlet_uuid: string;
	floor_area_uuid: string;
};

export type UpdateArea = {uuid: string; metadata: NewMetadata};

export type UpdateAreaResult = ResultMutation<UpdateArea | undefined>;

export type UpdateAreaRepository = {
	UpdateArea(input: UpdateAreaInput): void;
} & UpdateAreaResult;
