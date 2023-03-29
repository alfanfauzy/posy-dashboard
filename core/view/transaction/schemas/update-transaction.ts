import {z} from 'zod';

export const validationSchemaUpdateTransaction = z.object({
	restaurant_outlet_table_uuid: z.object({
		label: z.string(),
		value: z.string().min(1, {message: 'Table is required'}),
	}),
	customer_name: z.string().min(1, {message: 'Customer Name is required'}),
	total_pax: z
		.string()
		.regex(/^[0-9+\-()]*$/i, {
			message: 'Only number characters is allowed',
		})
		.min(1, {message: 'Total pax is required'}),
	transaction_category: z.object({
		label: z.string(),
		value: z.number(),
	}),
});

export type ValidationSchemaUpdateTransactionType = z.infer<
	typeof validationSchemaUpdateTransaction
>;
