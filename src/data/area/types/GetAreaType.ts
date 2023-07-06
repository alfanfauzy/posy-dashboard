import {NewMetadata} from '@/data/common/types/metadata';

export type GetAreaDataResponse = {
	uuid: string;
	restaurant_outlet_uuid: string;
	name: string;
	type: string;
	width: number;
	height: number;
	metadata: NewMetadata;
};
