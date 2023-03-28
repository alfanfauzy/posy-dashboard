import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions, UseQueryOptions} from '@tanstack/react-query';

export type MutationOptions<TData, TVariables = unknown> = UseMutationOptions<
	Response<TData>,
	unknown,
	TVariables,
	unknown
>;

export type QueryOptions = Omit<
	UseQueryOptions<unknown, unknown, unknown, Array<string>>,
	'queryKey' | 'queryFn' | 'initialData'
> & {
	initialData?: () => undefined;
};
