import {NewMetadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type DeleteTableInput = {
	table_uuid: string;
	restaurant_outlet_uuid: string;
};

export type DeleteTable = {metadata: NewMetadata};

export type DeleteTableResult = ResultMutation<DeleteTable | undefined>;

export type DeleteTableRepository = {
	DeleteTable(input: DeleteTableInput): void;
} & DeleteTableResult;
