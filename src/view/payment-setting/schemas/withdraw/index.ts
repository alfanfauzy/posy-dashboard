import {z} from 'zod';

export const WithdrawFormSchema = z.object({
	password: z.string().min(1).nonempty(),
	amount: z
		.string()
		.min(1, {message: 'Field must be filled'})
		.refine(
			val => {
				const parsedValue = parseInt(val);
				return !(parsedValue < 10000);
			},
			{
				message: 'Minimum withdraw is Rp10.000',
			},
		)
		.refine(
			val => {
				const parsedValue = parseInt(val);
				return !(parsedValue > 10000000);
			},
			{
				message: 'Maximum withdraw is Rp10.000.000',
			},
		),
});

export type WithdrawForm = z.infer<typeof WithdrawFormSchema>;
