import {z} from 'zod';

export const ProductMasterSchema = z
	.object({
		product_name: z.string().min(3),
		product_description: z.string().max(2000).optional(),
		product_image_url: z.string().optional(),
		is_favourite: z.boolean(),
		is_show: z.boolean(),
		is_available: z.boolean(),
		is_discount: z.boolean(),
		is_active_cooking_duration: z.boolean(),
		force_outlet_update: z.any(),
		price: z.string().nonempty(),
		price_after_discount: z
			.string()
			.min(1, {message: 'Price is required'})
			.optional()
			.or(z.literal('')),
		price_discount_percentage: z.string().optional(),
		cooking_duration: z
			.string()
			.min(1, {message: 'Cooking duration is required'})
			.optional()
			.or(z.literal('')),
		restaurant_outlet_uuids: z
			.object({
				label: z.string(),
				value: z.string(),
			})
			.array(),
		category_uuids: z.array(
			z.object({
				label: z.string(),
				value: z.string(),
			}),
		),
		addon: z
			.object({
				addon_name: z.string().min(3).nonempty(),
				is_optional: z.boolean(),
				can_choose_multiple: z.boolean(),
				max_variant: z.string().optional(),
				addon_priority: z.string().optional(),
				variants: z
					.object({
						variant_name: z.string().min(3).nonempty(),
						variant_price: z.string().nonempty(),
						variant_priority: z.number(),
					})
					.array(),
			})
			.array()
			.optional(),
	})
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

export type ValidationSchemaMasterProductType = z.infer<
	typeof ProductMasterSchema
>;
