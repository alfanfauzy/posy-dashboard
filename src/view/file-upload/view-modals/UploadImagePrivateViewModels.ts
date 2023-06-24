import {UploadFilePrivateResponse} from '@/data/file-upload/types';
import {useUploadImagePrivateUsecase} from '@/data/file-upload/usecases/UploadPrivateUsecase';
import {FormUploadImage} from '@/domain/file-upload/models';
import {UploadImagePrivateRepository} from '@/domain/file-upload/repositories/FileUploadRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useUploadImagePrivateViewModal = (
	options?: UseMutationOptions<
		Response<UploadFilePrivateResponse>,
		AxiosError<Response>,
		FormUploadImage
	>,
): UploadImagePrivateRepository => {
	const result = useUploadImagePrivateUsecase(options);

	return result;
};
