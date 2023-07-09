export type GetTableLayoutByFloorDataResponse = {
	layout: Array<Row>;
};

type Row = {
	rows: Array<Col>;
};

type Col = {
	table_uuid: string;
	table_number: string;
	table_seat: number;
	table_image: string;
	position_x: number;
	position_y: number;
};
