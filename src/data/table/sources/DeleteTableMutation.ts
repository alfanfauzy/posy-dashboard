import Post from '@/data/common/api/post';
import {DeleteTableInput} from '@/domain/table/repositories/DeleteTableRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {DeleteTableDataResponse} from '../types/DeleteTableType';

const DeleteTable = async (
	input: DeleteTableInput,
): Promise<Response<DeleteTableDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/table/delete/${input.table_uuid}?restaurant_outlet_uuid=${input.restaurant_outlet_uuid}`,
		data: {},
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useDeleteTableMutation = (
	options: UseMutationOptions<
		Response<DeleteTableDataResponse>,
		AxiosError<Response>,
		DeleteTableInput
	>,
) =>
	useMutation({
		mutationFn: DeleteTable,
		...options,
	});
