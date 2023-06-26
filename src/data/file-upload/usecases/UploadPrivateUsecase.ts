import {MutationOptions} from '@/data/common/types';
import {useUploadImagePrivateMutation} from '@/data/file-upload/sources/UploadPrivateQuery';
import {FormUploadImage} from '@/domain/file-upload/models';

export const useUploadImagePrivateUsecase = ({...options}: MutationOptions) => {
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
