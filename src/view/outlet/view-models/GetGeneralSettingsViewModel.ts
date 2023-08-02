import {GetGeneralSettingsDataResponse} from '@/data/outlet/types/GetGeneralSettingsType';
import {useGetGeneralSettingsUsecase} from '@/data/outlet/usecases/GetGeneralSettingsUsecase';
import {
	GetGeneralSettingsInput,
	GetGeneralSettingsResult,
} from '@/domain/outlet/repositories/GetGeneralSettingsRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from '@tanstack/react-query';

export const useGetGeneralSettingsViewModel = (
	input: GetGeneralSettingsInput,
	options?: UseQueryOptions<Response<GetGeneralSettingsDataResponse>>,
): GetGeneralSettingsResult => {
	const result = useGetGeneralSettingsUsecase(input, options);

	return result;
};
