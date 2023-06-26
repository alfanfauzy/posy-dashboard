import {useSaveBankAccountUsecase} from '@/data/bank/usecases/CreateSaveBankAccountUsecase';
import {MutationOptions} from '@/data/common/types';
import {SaveBankAccountRepository} from '@/domain/bank/repositories/CreateSaveBankRepository';

export const useSaveAccountBankViewModal = (
	options: MutationOptions,
): SaveBankAccountRepository => {
	const result = useSaveBankAccountUsecase(options);

	return result;
};
