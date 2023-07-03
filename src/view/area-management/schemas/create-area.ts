import {z} from 'zod';

export const validationSchemaCreateArea = z.object({
	name: z.string().min(1, {message: 'Name is required'}),
	floor_size_uuid: z.object({value: z.string(), label: z.string()}),
	total_table: z.string().min(1, {message: 'Total table is required'}),
	restaurant_outlet_uuid: z.string().min(1),
});

export type ValidationSchemaCreateAreaType = z.infer<
	typeof validationSchemaCreateArea
>;
