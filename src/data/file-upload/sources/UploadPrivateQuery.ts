import Post from '@/data/common/api/post';
import {FormUploadImage} from '@/domain/file-upload/models';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {UploadFilePrivateResponse} from '../types';

export const UploadImagePrivateService = async (
	payload: FormUploadImage,
): Promise<Response<UploadFilePrivateResponse>> => {
	try {
		const response = await Post({
			endpoint: `/document-service/v1/document/private/upload`,
			data: payload,
			headers: {'Content-Type': 'multipart/form-data'},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUploadImagePrivateMutation = (
	options?: UseMutationOptions<
		Response<UploadFilePrivateResponse>,
		AxiosError<Response>,
		FormUploadImage
	>,
) =>
	useMutation({
		mutationFn: UploadImagePrivateService,
		...options,
	});
