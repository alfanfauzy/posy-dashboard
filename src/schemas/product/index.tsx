import {z} from 'zod';

export const validationSchemaProduct = z.object({
	product_name: z
		.string()
		.min(1, {message: 'Product name must be atleast 1 characters'}),
	addon: z
		.object({
			addon_name: z
				.string()
				.min(1, {message: 'Addon name must be atleast 1 characters'}),
			addon_variants: z
				.object({
					variant_name: z
						.string()
						.min(1, {message: 'Variant name must be atleast 1 characters'}),
					variant_price: z.string(),
				})
				.array(),
		})
		.array(),
});

export type ValidationSchemaProductType = z.infer<
	typeof validationSchemaProduct
>;
