import {MutationOptions} from '@/data/common/types';
import {CreatePrintReceiptDataResponse} from '@/data/transaction/types/CreatePrintReceiptType';
import {useCreatePrintReceiptUsecase} from '@/data/transaction/usecases/CreatePrintReceiptUsecase';
import {CreatePrintReceiptRepository} from '@/domain/transaction/repositories/CreatePrintReceiptRepository';

export const useCreatePrintReceiptViewModel = (
	options?: MutationOptions<CreatePrintReceiptDataResponse>,
): CreatePrintReceiptRepository => {
	const result = useCreatePrintReceiptUsecase(options);

	return result;
};
