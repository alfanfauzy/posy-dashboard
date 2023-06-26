import {useCheckBankUsecases} from '@/data/bank/usecases/CreateCheckBankUsecases';
import {MutationOptions} from '@/data/common/types';

export const useCheckBankViewModal = ({...options}: MutationOptions) => {
	const result = useCheckBankUsecases(options);

	return result;
};
