import {z} from 'zod';

export const validationSchemaUpdateTax = z
	.object({
		restaurant_outlet_uuid: z
			.string()
			.min(1, {message: 'Restaurant outlet is required'}),
		is_service_charge: z.boolean(),
		is_tax: z.boolean(),
		is_service_charge_taxable: z.boolean(),
		tax_type: z.union([
			z.literal('TAX_AFTER_DISCOUNT'),
			z.literal('TAX_INCLUDE_PRICE'),
		]),
		tax_percentage: z
			.string()
			.regex(/^[0-9+\-()]*$/i, {
				message: 'Only number characters is allowed',
			})
			.min(1, {message: 'Tax percentage is required'}),
		service_charge_percentage: z
			.string()
			.regex(/^[0-9+\-()]*$/i, {
				message: 'Only number characters is allowed',
			})
			.min(1, {message: 'Service charge percentage is required'}),
	})
	.refine(
		data => {
			if (data.is_service_charge) {
				return data.is_service_charge !== undefined;
			}
			return true;
		},
		{
			message:
				'Service charge percentage is required when is service charge active',
			path: ['service_charge_percentage'],
		},
	)
	.refine(
		data => {
			if (data.is_tax) {
				return data.is_tax !== undefined;
			}
			return true;
		},
		{
			message: 'Tax percentage is required when is tax active',
			path: ['tax_percentage'],
		},
	);

export type ValidationSchemaUpdateTaxType = z.infer<
	typeof validationSchemaUpdateTax
>;
