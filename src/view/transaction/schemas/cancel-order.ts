import {z} from 'zod';

export const validationSchemaCancelOrder = z.object({
	order: z
		.object({
			uuid: z.string(),
			cancel_reason_order: z
				.string()
				.min(1, {message: 'Cancel reason status must be select'}),
			order_detail: z
				.object({
					uuid: z.string().min(1, {message: 'Order detail must be select'}),
					cancel_reason_status: z
						.string()
						.min(1, {message: 'Cancel reason status must be select'}),
					cancel_reason_other: z.string().optional(),
				})
				.array(),
		})
		.array(),
});

export type ValidationSchemaCancelOrderType = z.infer<
	typeof validationSchemaCancelOrder
>;
