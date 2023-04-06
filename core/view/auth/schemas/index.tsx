import {z} from 'zod';

export const validationSchemaLogin = z.object({
	email: z.string().min(1, {message: 'Email is required'}).email({
		message: 'Please enter a valid email address',
	}),
	password: z
		.string()
		.min(6, {message: 'Password must be atleast 6 characters'}),
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
			.min(6, {message: 'Password must be at least 6 characters'})
			.regex(
				/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
				{
					message:
						'Password must contain at least one uppercase letter, one number, and one special character',
				},
			),
		confirm_password: z
			.string()
			.min(6, {message: 'Password must be at least 6 characters'})
			.regex(
				/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
				{
					message:
						'Password must contain at least one uppercase letter, one number, and one special character',
				},
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
