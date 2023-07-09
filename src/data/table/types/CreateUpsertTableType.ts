import {NewMetadata} from '@/data/common/types/metadata';

export type CreateUpsertTableDataResponse = {
	uuid: string;
	metadata: NewMetadata;
};
