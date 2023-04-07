import {MutationOptions} from '@/data/common/types';
import {useCreatePrintReceiptUsecase} from '@/data/transaction/usecases/CreatePrintReceiptUsecase';
import {CreatePrintReceiptRepository} from '@/domain/transaction/repositories/CreatePrintReceiptRepository';

export const useCreatePrintReceiptViewModel = (
	options: MutationOptions,
): CreatePrintReceiptRepository => {
	const result = useCreatePrintReceiptUsecase(options);

	return result;
};
