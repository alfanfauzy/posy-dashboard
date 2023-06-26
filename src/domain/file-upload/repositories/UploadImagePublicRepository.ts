import {FormUploadImage} from '@/domain/file-upload/models';
import {ResultMutation} from '@/domain/vo/BaseResponse';

/**
 * Upload Image Public
 */

export type UploadImagePublic = ResultMutation<any>;

export type UploadImagePublicRepository = {
	uploadImagePublic(params: FormUploadImage): void;
} & UploadImagePublic;
