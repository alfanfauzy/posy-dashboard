import {z} from 'zod';

export const validationSchemaEditTableArea = z.object({
	floor_area_uuid: z.string().min(1, {message: 'Floor area uuid is required'}),
	table_list: z
		.object({
			table_uuid: z.string(),
			table_number: z
				.string()
				.min(1, {message: 'Table name must be atleast 1 characters'})
				.max(30, {message: 'Table name is too long'}),
			table_seat: z
				.string()
				.min(1, {message: 'Table seat must be atleast 1 characters'}),
		})
		.array(),
});

export type ValidationSchemaEditTableAreaType = z.infer<
	typeof validationSchemaEditTableArea
>;
