import {NewMetadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type CreateUpsertTableInput = {
	floor_area_uuid: string;
	table_number: string;
	table_seat: number;
	position_x: number;
	position_y: number;
	restaurant_outlet_uuid: string;
};

export type CreateUpsertTable = {uuid: string; metadata: NewMetadata};

export type CreateUpsertTableResult = ResultMutation<
	CreateUpsertTable | undefined
>;

export type CreateUpsertTableRepository = {
	CreateUpsertTable(input: CreateUpsertTableInput): void;
} & CreateUpsertTableResult;
