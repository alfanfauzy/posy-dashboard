import {NewMetadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type DeleteAreaInput = {
	area_uuid: string;
	restaurant_outlet_uuid: string;
};

export type DeleteArea = {metadata: NewMetadata};

export type DeleteAreaResult = ResultMutation<DeleteArea | undefined>;

export type DeleteAreaRepository = {
	DeleteArea(input: DeleteAreaInput): void;
} & DeleteAreaResult;
