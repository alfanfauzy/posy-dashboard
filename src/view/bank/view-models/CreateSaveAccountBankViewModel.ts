import {useSaveBankAccountUsecases} from '@/data/bank/usecases/CreateSaveBankAccountUsecases';
import {MutationOptions} from '@/data/common/types';
import {SaveBankAccountRepository} from '@/domain/bank/repositories/BankRepository';

export const useSaveAccountBankViewModal = (
	options: MutationOptions,
): SaveBankAccountRepository => {
	const result = useSaveBankAccountUsecases(options);

	return result;
};
