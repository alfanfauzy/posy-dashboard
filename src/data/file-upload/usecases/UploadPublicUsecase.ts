import {MutationOptions} from '@/data/common/types';
import {FormUploadImage} from '@/domain/file-upload/models';

import {usePublicImagePublicMutation} from '../sources/UploadPublicQuery';

export const useUploadImagePublicUsecase = ({...options}: MutationOptions) => {
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
