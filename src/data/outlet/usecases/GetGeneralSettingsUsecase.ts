import {
	GetGeneralSettingsInput,
	GetGeneralSettingsResult,
} from '@/domain/outlet/repositories/GetGeneralSettingsRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

import {mapToGeneralSettingsModel} from '../mappers/GeneralSettingsMapper';
import {useGetGeneralSettingsQuery} from '../sources/GetGeneralSettingsQuery';
import {GetGeneralSettingsDataResponse} from '../types/GetGeneralSettingsType';

export const useGetGeneralSettingsUsecase = (
	input: GetGeneralSettingsInput,
	options?: UseQueryOptions<Response<GetGeneralSettingsDataResponse>>,
): GetGeneralSettingsResult => {
	const {data, ...rest} = useGetGeneralSettingsQuery(input, options);

	if (data?.data) {
		const dataMapper = mapToGeneralSettingsModel(data.data);

		return {
			data: dataMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
