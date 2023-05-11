import {GetCancellationReportsInput} from '@/domain/report-cancellation/repositories/GetCancellationReportRepository';
import InputSearch from '@/view/common/components/atoms/input/search';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {defineds} from '@/view/common/utils/date';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {toUnix} from '@/view/common/utils/UtilsdateFormatter';
import {useGetCancellationReportSummaryViewModel} from '@/view/report/view-models/GetCancellationReportSummaryViewModel';
import {useGetCancellationReportsViewModel} from '@/view/report/view-models/GetCancellationReportsViewModel';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import React, {useMemo, useState} from 'react';

import ReportSummaryCancellation from '../../organisms/summary/cancellation';
import CancellationTable from '../../organisms/table/cancellation';

const Datepicker = dynamic(
	() => import('@/view/common/components/atoms/input/datepicker'),
	{
		loading: () => <div />,
	},
);

const ViewReportCancellationPage = () => {
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

	const queryCancellationReport: GetCancellationReportsInput = useMemo(() => {
		return {
			limit: Number(query.limit) || 10,
			page: Number(query.page) || 1,
			search: [
				{
					field: 'status',
					value:
						'OUT_OF_STOCK|CUSTOMER_CANCELLATION|LONG_WAITING|WRONG_ORDER|OTHERS',
				},
				{
					field: 'keyword',
					value: (query.search as string) || '',
				},
				{
					field: 'transaction_start',
					value: `${toUnix(date[0].startDate)}&&${toUnix(date[0].endDate)}`,
				},
				{
					field: 'restaurant_outlet_uuid',
					value: outletId,
				},
			],
		};
	}, [query, outletId, date]);

	const {
		data: dataCancellationReports,
		isLoading: loadCancellationDataReports,
		pagination,
	} = useGetCancellationReportsViewModel(queryCancellationReport, {
		enabled: outletId?.length > 0 && isSubscription && isLoggedIn,
	});

	const {data: dataSummary, isLoading: loadSummary} =
		useGetCancellationReportSummaryViewModel(queryCancellationReport, {
			enabled: outletId?.length > 0 && isSubscription && isLoggedIn,
		});

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
			<article>
				<aside className="flex justify-between">
					<p className="text-xxl-semibold text-neutral-100 lg:text-heading-s-semibold">
						Cancellation Report
					</p>
				</aside>
				<aside className="mt-6">
					<div className="mt-1 flex items-center space-x-4">
						<Datepicker
							dateProps={date}
							close={closeFilterDate}
							open={openFilterDate}
							isOpen={isOpenFilterDate}
							handleChange={item => setDate([item])}
						/>

						<div className="flex w-1/2 items-center lg:w-1/4">
							<InputSearch
								isOpen
								placeholder="Search transaction"
								search={(query.search as string) || ''}
								onSearch={e => onChangeQueryParams('search', e.target.value)}
								onClearSearch={() => onChangeQueryParams('search', '')}
							/>
						</div>
					</div>
				</aside>
				<ReportSummaryCancellation isLoading={loadSummary} data={dataSummary} />
				<CancellationTable
					data={dataCancellationReports}
					isLoading={loadCancellationDataReports}
					pagination={pagination}
				/>
			</article>
		</main>
	);
};

export default ViewReportCancellationPage;
