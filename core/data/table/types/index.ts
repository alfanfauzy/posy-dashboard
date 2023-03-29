import {CreatedAt, UpdatedAt} from '@/data/common/types/metadata';

export type GetTablesDataResponse = {
	uuid: string;
	restaurant_outlet_uuid: string;
	table_number: string;
	priority: number;
	created_at: CreatedAt;
	updated_at: UpdatedAt;
};
