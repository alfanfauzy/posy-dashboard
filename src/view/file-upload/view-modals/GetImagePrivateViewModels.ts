import {useGetImagePrivateUsecase} from '@/data/file-upload/usecases/GetImagePrivateUsecase';
import {GetPrivateImageResult} from '@/domain/file-upload/repositories/FileUploadRepository';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetImagePrivateViewModel = (
	imageURL: string,
	options?: UseQueryOptions<string>,
): GetPrivateImageResult => {
	const result = useGetImagePrivateUsecase(imageURL, options);

	return result;
};
