import {MutationOptions} from '@/data/common/types';
import {useGetQrCodeUsecase} from '@/data/transaction/usecases/GetQrCodeUsecase';
import {GetQrCodeRepository} from '@/domain/transaction/repositories/GetQrCodeRepository';

export const useGetQrCodeViewModel = (
	options: MutationOptions,
): GetQrCodeRepository => {
	const result = useGetQrCodeUsecase(options);

	return result;
};
