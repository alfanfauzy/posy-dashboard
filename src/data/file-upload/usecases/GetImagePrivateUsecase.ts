import {useGetImagePrivateQuery} from '@/data/file-upload/sources/GetImagePrivateQuery';
import {GetPrivateImageResult} from '@/domain/file-upload/repositories/FileUploadRepository';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetImagePrivateUsecase = (
	imageURL: string,
	options?: UseQueryOptions<string>,
): GetPrivateImageResult => {
	const {data, ...rest} = useGetImagePrivateQuery(imageURL, options);

	if (data) {
		return {
			data: data,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
