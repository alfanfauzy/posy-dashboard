import {z} from 'zod';

export const validationSchemaCreateTransactionFromTableView = z.object({
	customer_name: z.string().optional(),
	total_pax: z.string().optional(),
});

export type ValidationSchemaCreateTransactionFromTableViewType = z.infer<
	typeof validationSchemaCreateTransactionFromTableView
>;
