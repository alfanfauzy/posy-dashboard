import {z} from 'zod';

export const validationSchemaUpdateTransaction = z
	.object({
		restaurant_outlet_table_uuid: z.string().optional().or(z.literal('')),
		customer_name: z.string().optional(),
		total_pax: z.string().optional(),
		transaction_category: z.object({
			label: z.string(),
			value: z.number(),
		}),
	})
	.refine(
		data => {
			if (
				data.transaction_category.value === 0 &&
				data.restaurant_outlet_table_uuid === ''
			) {
				return false;
			}
			return true;
		},
		{
			message: 'Table is required',
			path: ['restaurant_outlet_table_uuid'],
		},
	);

export type ValidationSchemaUpdateTransactionType = z.infer<
	typeof validationSchemaUpdateTransaction
>;
