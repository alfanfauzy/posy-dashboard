import {FormUploadImage} from '@/domain/file-upload/models';
import {ResultMutation, ResultQuery} from '@/domain/vo/BaseResponse';

/**
 * Upload Image Public
 */

export type UploadImagePublic = ResultMutation<any>;

export type UploadImagePublicRepository = {
	uploadImagePublic(params: FormUploadImage): void;
} & UploadImagePublic;

/**
 * Upload Image Private
 */

export type UploadImagePrivate = ResultMutation<any>;

export type UploadImagePrivateRepository = {
	uploadImagePrivate(params: FormUploadImage): void;
} & UploadImagePrivate;

/**
 * Get Private Image
 */
export type GetPrivateImageResult = ResultQuery<any | undefined>;
