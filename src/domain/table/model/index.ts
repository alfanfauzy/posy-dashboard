import {Transactions} from '@/domain/transaction/model';

type TableBased = {
	uuid: string;
	restaurant_outlet_uuid: string;
	table_number: string;
	priority: number;
	created_at: number;
	updated_at: number;
	floor_area_uuid: string;
	table_seat: number;
	table_image: string;
	position_x: number;
	position_y: number;
	transactions?: Transactions;
};

export type Tables = Array<TableBased>;
export type Table = TableBased;
