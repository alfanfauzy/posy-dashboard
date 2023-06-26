import {useCheckBankUsecase} from '@/data/bank/usecases/CreateCheckBankUsecase';
import {MutationOptions} from '@/data/common/types';

export const useCheckBankViewModal = ({...options}: MutationOptions) => {
	const result = useCheckBankUsecase(options);

	return result;
};
