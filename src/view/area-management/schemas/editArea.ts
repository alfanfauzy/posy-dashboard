import {z} from 'zod';

export const validationSchemaEditArea = z.object({
	name: z.string().min(1, {message: 'Name is required'}),
	restaurant_outlet_uuid: z.string().min(1),
});

export type ValidationSchemaEditAreaType = z.infer<
	typeof validationSchemaEditArea
>;
