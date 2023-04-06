import InputSearch from '@/atoms/input/search';
import useDisclosure from '@/hooks/useDisclosure';
import {useAppSelector} from '@/store/hooks';
import {defineds} from '@/utils/date';
import {onChangeQueryParams} from '@/utils/UtilsChangeQueryParams';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

import {useGetTransactionReportSummaryViewModel} from '../../view-models/GetTransactionReportSummaryViewModel';
import {useGetTransactionReportsViewModel} from '../../view-models/GetTransactionReportsViewModel';
import ReportSummary from '../organisms/summary';
import ReportTable from '../organisms/table';

const Datepicker = dynamic(() => import('@/atoms/input/datepicker'), {
	loading: () => <div />,
});

const ViewReportPage = () => {
	const {query} = useRouter();
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);

	const [isOpenFilterDate, {open: openFilterDate, close: closeFilterDate}] =
		useDisclosure({initialState: false});

	const [date, setDate] = useState([
		{
			startDate: defineds.startOfDay,
			endDate: defineds.endOfDay,
			key: 'selection',
		},
	]);

	const {
		data: dataReports,
		isLoading: loadDataReports,
		pagination,
	} = useGetTransactionReportsViewModel(
		{
			limit: Number(query.limit) || 10,
			page: Number(query.page) || 1,
			search: [
				{
					field: 'status',
					value: 'PAID|CANCELLED',
				},
				// {
				// 	field: 'keyword',
				// 	value: (query.search as string) || '',
				// },
				// {
				// 	field: 'created_at',
				// 	value: `${toUnix(date[0].startDate)}&&${toUnix(date[0].endDate)}`,
				// },
				{
					field: 'restaurant_outlet_uuid',
					value: outletId,
				},
			],
		},
		{
			enabled: outletId.length > 0 && isSubscription && isLoggedIn,
		},
	);

	const {data: dataSummary, isLoading: loadSummary} =
		useGetTransactionReportSummaryViewModel(
			{
				limit: Number(query.limit) || 10,
				page: Number(query.page) || 1,
				search: [
					{
						field: 'status',
						value: 'PAID|CANCELLED',
					},
					// {
					// 	field: 'keyword',
					// 	value: (query.search as string) || '',
					// },
					// {
					// 	field: 'created_at',
					// 	value: `${toUnix(date[0].startDate)}&&${toUnix(date[0].endDate)}`,
					// },
					{
						field: 'restaurant_outlet_uuid',
						value: outletId,
					},
				],
			},
			{
				enabled: outletId.length > 0 && isSubscription && isLoggedIn,
			},
		);

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
			<article>
				<aside className="flex items-start">
					<p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
						Report Summary
					</p>
				</aside>
				<aside className="mt-6">
					<div className="mt-1 flex items-center space-x-4">
						<Datepicker
							dateProps={date}
							close={closeFilterDate}
							open={openFilterDate}
							isOpen={isOpenFilterDate}
							handleChange={(item: any) => setDate([item])}
						/>
						<div className="flex w-1/2 items-center lg:w-1/4">
							<InputSearch
								isOpen
								placeholder="Search Transaction"
								search={(query.search as string) || ''}
								onSearch={e => onChangeQueryParams('search', e.target.value)}
								onClearSearch={() => onChangeQueryParams('search', '')}
							/>
						</div>
					</div>
				</aside>
				<ReportSummary isLoading={loadSummary} data={dataSummary} />
				<ReportTable
					data={dataReports}
					isLoading={loadDataReports}
					pagination={pagination}
				/>
			</article>
		</main>
	);
};

export default ViewReportPage;
