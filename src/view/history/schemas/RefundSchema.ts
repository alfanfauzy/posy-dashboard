import {z} from 'zod';

export const validationSchemaRefund = z.object({
	authorization_user_uuid: z.object({
		value: z.string().min(1, {message: 'User is required'}),
	}),
	authorization_credential: z
		.string()
		.min(6, {message: 'Password must be atleast 6 characters'}),
	refund_notes: z
		.string()
		.min(10, {message: 'Refund notes must be atleast 10 characters'}),
});

export type ValidationSchemaRefundType = z.infer<typeof validationSchemaRefund>;
