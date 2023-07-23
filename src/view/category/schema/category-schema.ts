import {z} from 'zod';

export const validateSchemaFormCategory = z.object({
	is_active: z.boolean(),
	category_name: z.string().min(1),
});

export type FormCategoryValidation = z.infer<typeof validateSchemaFormCategory>;
