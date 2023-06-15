import {useUploadImagePrivateMutation} from '@/data/file-upload/sources/UploadPrivateQuery';
import {UploadFilePrivateResponse} from '@/data/file-upload/types';
import {FormUploadImage} from '@/domain/file-upload/models';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export const useUploadImagePrivateUsecase = (
	options?: UseMutationOptions<
		Response<UploadFilePrivateResponse>,
		AxiosError<Response>,
		FormUploadImage
	>,
): any => {
	const {mutate, data, ...rest} = useUploadImagePrivateMutation(options);

	const uploadImagePrivate = (payload: FormUploadImage) => {
		mutate(payload);
	};

	return {
		uploadImagePrivate,
		data: data?.data,
		...rest,
	};
};
