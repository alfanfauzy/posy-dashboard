import {ResultMutation} from '@/domain/vo/BaseResponse';

export type UpdateBulkTableByFloorInput = {
	restaurant_outlet_uuid: string;
	floor_area_uuid: string;
	tables: Array<{
		uuid: string;
		table_number: string;
		table_seat: number;
	}>;
};

export type UpdateBulkTableByFloor = {uuid: string; updated_at: number};

export type UpdateBulkTableByFloorResult = ResultMutation<
	UpdateBulkTableByFloor | undefined
>;

export type UpdateBulkTableByFloorRepository = {
	UpdateBulkTableByFloor(input: UpdateBulkTableByFloorInput): void;
} & UpdateBulkTableByFloorResult;
