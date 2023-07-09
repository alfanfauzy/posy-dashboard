import {Tables} from '@/domain/table/model';
import {TableLayout} from '@/domain/table/model/TableLayout';
import {NewMetadata} from '@/domain/vo/BaseMetadata';

import {GetTablesDataResponse} from '../types';
import {CreateUpsertTableDataResponse} from '../types/CreateUpsertTableType';
import {GetTableLayoutByFloorDataResponse} from '../types/GetTableLayoutByFloorType';

// map server data to own model
export const mapToTablesModel = (datas: Array<GetTablesDataResponse>): Tables =>
	datas.map(data => ({
		uuid: data.uuid,
		restaurant_outlet_uuid: data.restaurant_outlet_uuid,
		table_number: data.table_number,
		priority: data.priority,
		created_at: data.created_at.seconds,
		updated_at: data.updated_at.seconds,
	}));

export const mapToCreateUpsertTableModel = (
	data: CreateUpsertTableDataResponse,
): {uuid: string; metadata: NewMetadata} => ({
	uuid: data.uuid,
	metadata: data.metadata,
});

export const mapToTableLayoutModel = (
	data: GetTableLayoutByFloorDataResponse,
): TableLayout => {
	const multiArray: TableLayout = [];

	data?.layout?.forEach(item => {
		const {rows} = item;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const rowArray: Array<any> = [];

		rows.forEach(col => {
			if (col) {
				rowArray.push(col);
			} else {
				rowArray.push(null);
			}
		});

		multiArray.push(rowArray);
	});
	return multiArray;
};
