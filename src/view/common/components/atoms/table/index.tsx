/* eslint-disable react/no-unstable-nested-components */
import {type Pagination} from '@/domain/vo/BasePagination';
import Select from '@/view/common/components/atoms/input/select';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {Table} from 'antd';
import type {TableProps} from 'antd/es/table';
import React from 'react';

type AtomsTableProps<TData> = {
	paginationData: Pagination | undefined;
	className?: string;
} & TableProps<TData>;

type PaginationProps = {
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	value: string;
};

const paginationOptions = [
	{label: 'Select Row: 10', value: '10'},
	{label: 'Select Row: 20', value: '20'},
	{label: 'Select Row: 50', value: '50'},
];

const Pagination = ({onChange, value}: PaginationProps) => {
	return (
		<div className="absolute left-0 flex items-center">
			<Select
				className="!w-[164px]"
				options={paginationOptions}
				onChange={onChange}
				value={value}
			/>
		</div>
	);
};

const AtomsTable = <TData extends object>({
	columns,
	dataSource,
	className,
	loading,
	paginationData,
	...tableProps
}: AtomsTableProps<TData>) => {
	const onChangeLimit = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		await onChangeQueryParams('limit', e.target.value);
		await onChangeQueryParams('page', '1');
	};

	return (
		<div className="w-full overflow-auto">
			<Table<TData>
				loading={loading}
				className={className}
				columns={columns}
				dataSource={dataSource}
				pagination={{
					current: paginationData?.curr_page,
					position: ['bottomRight'],
					pageSize: paginationData?.per_page,
					total: paginationData?.total_page,
					showTotal: () => (
						<Pagination
							onChange={onChangeLimit}
							value={paginationData?.per_page.toString() || '10'}
						/>
					),
					onChange: async page => {
						await onChangeQueryParams('page', page.toString() || '');
					},
				}}
				{...tableProps}
			/>
		</div>
	);
};

export default AtomsTable;
