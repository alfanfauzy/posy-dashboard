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

export const validationSchemaCreateNewPassword = z.object({
	password: z
		.string()
		.min(6, {message: 'Password must be atleast 6 characters'}),
	confirmPassword: z
		.string()
		.min(6, {message: 'Password must be atleast 6 characters'}),
});

export type ValidationSchemaCreateNewPasswordType = z.infer<
	typeof validationSchemaCreateNewPassword
>;
