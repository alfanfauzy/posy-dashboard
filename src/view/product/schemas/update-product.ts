import {z} from 'zod';

export const validationSchemaProductOutlet = z
	.object({
		is_favourite: z.boolean(),
		is_show: z.boolean(),
		is_available: z.boolean(),
		is_discount: z.boolean(),
		is_active_cooking_duration: z.boolean(),
		cooking_duration: z
			.string()
			.min(1, {message: 'Cooking duration is required'})
			.optional()
			.or(z.literal('')),
		price: z.string().min(1, {message: 'Price is required'}),
		price_after_discount: z
			.string()
			.min(1, {message: 'Price is required'})
			.optional()
			.or(z.literal('')),
		price_discount_percentage: z
			.string()
			.regex(/^[0-9+\-()]*$/i, {
				message: 'Only number characters is allowed',
			})
			.min(1, {message: 'Discount percentage is required'})
			.refine(val => parseInt(val) <= 100, {
				message: "Discount percentage can't be more than 100%",
			})
			.optional()
			.or(z.literal('')),
		addon: z
			.object({
				addon_name: z
					.string()
					.min(1, {message: 'Addon name must be atleast 1 characters'}),
				is_required: z.boolean(),
				can_choose_multiple: z.boolean(),
				addon_variants: z
					.object({
						variant_name: z
							.string()
							.min(1, {message: 'Variant name must be atleast 1 characters'}),
						variant_price: z
							.string()
							.min(1, {message: 'Variant price is required'}),
					})
					.array(),
			})
			.array(),
	})
	.refine(
		data => {
			if (data.is_discount && !data.price_after_discount) {
				return false;
			}
			return true;
		},
		{
			message: 'Price after discount is required',
			path: ['price_after_discount'],
		},
	)
	.refine(
		data => {
			if (data.is_discount && !data.price_discount_percentage) {
				return false;
			}
			return true;
		},
		{
			message: 'Discount is required',
			path: ['price_discount_percentage'],
		},
	)
	.refine(
		data => {
			if (data.is_active_cooking_duration && !data.cooking_duration) {
				return false;
			}
			return true;
		},
		{
			message: 'Cooking duration is required',
			path: ['cooking_duration'],
		},
	);

export type ValidationSchemaProductOutletType = z.infer<
	typeof validationSchemaProductOutlet
>;
