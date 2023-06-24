import {UploadFilePublicResponse} from '@/data/file-upload/types';
import {useUploadImagePublicUsecase} from '@/data/file-upload/usecases/UploadPublicUsecase';
import {FormUploadImage} from '@/domain/file-upload/models';
import {UploadImagePublicRepository} from '@/domain/file-upload/repositories/FileUploadRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useUploadImagePublicViewModal = (
	options?: UseMutationOptions<
		Response<UploadFilePublicResponse>,
		AxiosError<Response>,
		FormUploadImage
	>,
): UploadImagePublicRepository => {
	const result = useUploadImagePublicUsecase(options);

	return result;
};
