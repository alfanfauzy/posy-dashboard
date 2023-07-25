import {Pagination} from '@/domain/vo/BasePagination';
import Datepicker from '@/view/common/components/atoms/input/datepicker';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {Dates} from '@/view/common/types/date';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import React from 'react';

// const actionOptions = (length: number) => [
// 	{
// 		label: `Selected ${length} ${length === 1 ? 'item' : 'items'}`,
// 		value: '',
// 	},
// 	{label: 'Mark as shown', value: 'is_show'},
// 	{label: 'Mark as available', value: 'is_available'},
// ];

type OrganismsNavFilterProductProps = {
	// selectedRowKeys: Array<Key>;
	// setSelectedRowKeys: (key: Array<Key>) => void;
	pagination: Pagination | undefined;
	dates: Array<Dates>;
};

const OrganismsNavFilterProduct = ({
	// selectedRowKeys,
	// setSelectedRowKeys,
	pagination,
	dates,
}: OrganismsNavFilterProductProps) => {
	const [isOpenFilterDate, {open: openFilterDate, close: closeFilterDate}] =
		useDisclosure({initialState: false});

	const onChangeDate = async (dt: Array<Dates>) => {
		await onChangeQueryParams(
			'start_date',
			dateFormatter(dt[0].startDate, 'yyyy-MM-dd') as string,
		);
		await onChangeQueryParams(
			'end_date',
			dateFormatter(dt[0].endDate, 'yyyy-MM-dd') as string,
		);
	};

	return (
		<aside className="mt-4">
			<div className="mt-1 flex items-center space-x-4">
				<Datepicker
					dateProps={dates}
					close={closeFilterDate}
					open={openFilterDate}
					isOpen={isOpenFilterDate}
					handleChange={(item: Dates) => onChangeDate([item])}
				/>
				{/* 
				<div className="flex w-1/2 items-center lg:w-1/4">
					<InputSearch
						placeholder="Search transaction"
						isOpen
						search={(query.search as string) || ''}
						onSearch={e => onChangeQueryParams('search', e.target.value)}
						onClearSearch={() => onChangeQueryParams('search', '')}
					/>
				</div> */}
				{pagination && pagination?.total_objs > 0 && (
					<p className="text-m-medium text-primary-main">
						Total ratings: {pagination?.total_objs}
					</p>
				)}
			</div>
		</aside>
	);
};

export default OrganismsNavFilterProduct;
