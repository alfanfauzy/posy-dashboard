import Post from '@/data/common/api/post';
import {CreateUpsertTableInput} from '@/domain/table/repositories/CreateUpsertTableRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {CreateUpsertTableDataResponse} from '../types/CreateUpsertTableType';

const CreateUpsertTable = async (
	input: CreateUpsertTableInput,
): Promise<Response<CreateUpsertTableDataResponse>> => {
	const response = await Post({
		endpoint: `/user-service/table/upsert?restaurant_outlet_uuid=${input.restaurant_outlet_uuid}`,
		data: input,
	});

	return {
		code: response?.code,
		data: response?.data,
		message: response?.message,
		more_info: response?.more_info,
	};
};

export const useCreateUpsertTableMutation = (
	options: UseMutationOptions<
		Response<CreateUpsertTableDataResponse>,
		AxiosError<Response>,
		CreateUpsertTableInput
	>,
) =>
	useMutation({
		mutationFn: CreateUpsertTable,
		...options,
	});
