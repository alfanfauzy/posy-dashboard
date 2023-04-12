import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetTableStatusInput = {
	restaurant_outlet_uuid: string;
};

export type TableStatus = {
	table_uuid: string;
	table_number: string;
	priority: number;
	is_available: boolean;
};

export type GetTableStatusResult = ResultQuery<Array<TableStatus> | undefined>;
