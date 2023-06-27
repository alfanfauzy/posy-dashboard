/**
 * Upload Image Private
 */

import {ResultMutation} from '@/domain/vo/BaseResponse';

import {FormUploadImage} from '../models';

export type UploadImagePrivate = ResultMutation<any>;

export type UploadImagePrivateRepository = {
	uploadImagePrivate(params: FormUploadImage): void;
} & UploadImagePrivate;
