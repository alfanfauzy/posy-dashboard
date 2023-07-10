import {ResultMutation} from '@/domain/vo/BaseResponse';

export type UpdateSaveTableLayoutInput = {
	restaurant_outlet_uuid: string;
	floor_area_uuid: string;
	layout: Array<Array<{uuid: string} | null>>;
};

export type UpdateSaveTableLayout = {uuid: string; updated_at: number};

export type UpdateSaveTableLayoutResult = ResultMutation<
	UpdateSaveTableLayout | undefined
>;

export type UpdateSaveTableLayoutRepository = {
	UpdateSaveTableLayout(payload: UpdateSaveTableLayoutInput): void;
} & UpdateSaveTableLayoutResult;
