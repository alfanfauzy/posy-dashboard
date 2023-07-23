import {z} from 'zod';

export const validationSchemaAddTable = z.object({
	floor_area_uuid: z.string().min(1, {message: 'Floor area uuid is required'}),
	table_number: z
		.string()
		.min(1, {message: 'Table name is required'})
		.max(30, {message: 'Table name is too long'}),
	table_seat: z.number().min(1, {message: 'Table seat is required'}),
	position_x: z.number(),
	position_y: z.number(),
});

export type ValidationSchemaAddTableType = z.infer<
	typeof validationSchemaAddTable
>;
