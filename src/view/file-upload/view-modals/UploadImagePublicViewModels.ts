import {useUploadImagePublicUsecase} from '@/data/file-upload/usecases/UploadPublicUsecase';
import {UploadImagePublicRepository} from '@/domain/file-upload/repositories/UploadImagePublicRepository';

export const useUploadImagePublicViewModal = ({
	...options
}): UploadImagePublicRepository => {
	const result = useUploadImagePublicUsecase(options);

	return result;
};
