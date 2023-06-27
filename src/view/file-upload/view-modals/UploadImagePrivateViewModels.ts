import {useUploadImagePrivateUsecase} from '@/data/file-upload/usecases/UploadPrivateUsecase';
import {UploadImagePrivateRepository} from '@/domain/file-upload/repositories/UploadImagePrivateRepository';

export const useUploadImagePrivateViewModal = ({
	...options
}): UploadImagePrivateRepository => {
	const result = useUploadImagePrivateUsecase(options);

	return result;
};
