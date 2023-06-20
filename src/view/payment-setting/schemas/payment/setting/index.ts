import {z} from 'zod';

export const PaymentBankAccountFormSchema = z.object({
	account_type: z.object({value: z.string(), label: z.string()}),
	bank_uuid: z.object({value: z.string(), label: z.string()}),
	account_number: z.string().nonempty('Please fill account number'),
	account_name: z.string().nonempty('Please fill account name'),
	email: z.string().email('This is not a valid email format'),
	bank_proof_url: z.string().min(1),
});

export type PaymentBankAccountForm = z.infer<
	typeof PaymentBankAccountFormSchema
>;
