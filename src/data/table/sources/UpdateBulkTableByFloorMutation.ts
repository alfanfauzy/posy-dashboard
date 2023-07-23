import Post from '@/data/common/api/post';
import {UpdateBulkTableByFloorInput} from '@/domain/table/repositories/UpdateBulkTableByFloorRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {UpdateBulkTableByFloorDataResponse} from '../types/UpdateBulkTableByFloorType';

const UpdateBulkTableByFloor = async (
	input: UpdateBulkTableByFloorInput,
): Promise<Response<UpdateBulkTableByFloorDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/table/update-bulk-by-floor?restaurant_outlet_uuid=${input.restaurant_outlet_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useUpdateBulkTableByFloorMutation = (
	options: UseMutationOptions<
		Response<UpdateBulkTableByFloorDataResponse>,
		AxiosError<Response>,
		UpdateBulkTableByFloorInput
	>,
) =>
	useMutation({
		mutationFn: UpdateBulkTableByFloor,
		...options,
	});
