import {z} from 'zod';

export const validationSchemaApplyDiscount = z.object({
	discount_percentage: z
		.string()
		.regex(/^[0-9+\-()]*$/i, {
			message: 'Only number characters is allowed',
		})
		.min(1, {message: 'Discount percentage is required'})
		.refine(val => parseInt(val) <= 100, {
			message: "Discount percentage can't be more than 100%",
		}),
	discount_price: z.string().min(1, {message: 'Price is required'}),
});

export type ValidationSchemaApplyDiscountType = z.infer<
	typeof validationSchemaApplyDiscount
>;
