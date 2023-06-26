import {FormUploadImage} from '@/domain/file-upload/models';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {usePublicImagePublicMutation} from '../sources/UploadPublicQuery';
import {UploadFilePublicResponse} from '../types';

export const useUploadImagePublicUsecase = (
	options?: UseMutationOptions<
		Response<UploadFilePublicResponse>,
		AxiosError<Response>,
		FormUploadImage
	>,
): any => {
	const {mutate, data, ...rest} = usePublicImagePublicMutation(options);

	const uploadImagePublic = (payload: FormUploadImage) => {
		mutate(payload);
	};

	return {
		uploadImagePublic,
		data: data?.data,
		...rest,
	};
};
