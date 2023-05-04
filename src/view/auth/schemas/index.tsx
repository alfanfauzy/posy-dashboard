import {z} from 'zod';

export const validationSchemaLogin = z.object({
	email: z.string().min(1, {message: 'Email is required'}).email({
		message: 'Please enter a valid email address',
	}),
	password: z
		.string()
		.min(8, {message: 'Password must be atleast 8 characters'}),
});

export type ValidationSchemaLoginType = z.infer<typeof validationSchemaLogin>;

export const validationSchemaForgetPassword = z.object({
	email: z.string().min(1, {message: 'Email is required'}).email({
		message: 'Please enter a valid email address',
	}),
});

export type ValidationSchemaForgetPasswordType = z.infer<
	typeof validationSchemaForgetPassword
>;

export const validationSchemaCreateNewPassword = z
	.object({
		password: z
			.string()
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
				'Password must be at least 8 Characters, 1 Uppercase and 1 Lowercase',
			),
		confirm_password: z
			.string()
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
				'Password must be at least 8 Characters, 1 Uppercase and 1 Lowercase',
			),
	})
	.superRefine(({password, confirm_password}, ctx) => {
		if (password !== confirm_password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The password did not match',
				path: ['confirm_password'],
			});
		}
	});

export type ValidationSchemaCreateNewPasswordType = z.infer<
	typeof validationSchemaCreateNewPassword
>;
