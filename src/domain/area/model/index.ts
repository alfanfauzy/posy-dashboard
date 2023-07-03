import {NewMetadata} from '@/domain/vo/BaseMetadata';

export type AreaBased = {
	uuid: string;
	restaurant_outlet_uuid: string;
	name: string;
	type: string;
	width: number;
	height: number;
	metadata: NewMetadata;
};

export type Area = AreaBased;
export type Areas = Array<AreaBased>;
