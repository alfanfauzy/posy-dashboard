import Post from '@/data/common/api/post';
import {FormUploadImage} from '@/domain/file-upload/models';
import {Response} from '@/domain/vo/BaseResponse';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {UploadFilePublicResponse} from '../types';

export const UploadImagePublicService = async (
	payload: FormUploadImage,
): Promise<Response<UploadFilePublicResponse>> => {
	try {
		const response = await Post({
			endpoint: `/document-service/v1/document/public/upload`,
			data: payload,
			headers: {'Content-Type': 'multipart/form-data'},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const usePublicImagePublicMutation = (
	options?: UseMutationOptions<
		Response<UploadFilePublicResponse>,
		AxiosError<Response>,
		FormUploadImage
	>,
) =>
	useMutation({
		mutationFn: UploadImagePublicService,
		...options,
	});
