import {useSaveBankAccountUsecase} from '@/data/bank/usecases/PostSaveBankAccountUsecase';
import {MutationOptions} from '@/data/common/types';
import {SaveBankAccountRepository} from '@/domain/bank/repositories/BankRepository';

export const useSaveAccountBankViewModal = (
	options: MutationOptions,
): SaveBankAccountRepository => {
	const result = useSaveBankAccountUsecase(options);

	return result;
};
