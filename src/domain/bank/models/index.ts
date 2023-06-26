/**
 * Bank List
 */

export type BankListBased = {
	uuid: string;
	bank_name: string;
	bank_code: string;
};

export type BankList = BankListBased;

export type BankLists = Array<BankListBased>;

/**
 * Check Bank
 */

export type CheckBankBased = {
	bank_uuid: string;
	account_number: string;
};

export type CheckBank = CheckBankBased;

/**
 * Save Bank Account
 */

export type SaveBankAccountBased = {
	metadata: {created_at: string; deleted_at: string; updated_at: string};
};

export type SaveBankAccountResponse = SaveBankAccountBased;

/**
 * Get Linked Bank
 */

export type LinkedBankAccountBased = {
	restaurant_uuid?: string;
	bank_name: string;
	bank_uuid?: string;
	account_number: string;
	account_name: string;
	email: string;
	bank_proof_url?: string;
};

export type LinkedBankAccount = LinkedBankAccountBased;
