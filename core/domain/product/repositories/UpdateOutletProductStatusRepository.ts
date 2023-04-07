import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type UpdateOutletProductStatusInput = {
	restaurant_outlet_uuid: string;
	status: 'is_show' | 'is_available';
	flag: boolean;
	product_uuids: Array<string>;
};

export type UpdateOutletProductStatus = {
	success: boolean;
	metadata: Metadata;
};

export type UpdateOutletProductStatusResult = ResultMutation<
	UpdateOutletProductStatus | undefined
>;

export type UpdateOutletProductStatusRepository = {
	updateOutletProductStatus(input: UpdateOutletProductStatusInput): void;
} & UpdateOutletProductStatusResult;
