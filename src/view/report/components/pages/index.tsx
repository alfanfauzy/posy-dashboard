import {GetDownloadTransactionReportInput} from '@/domain/report/repositories/GetDownloadReportsRepository';
import {GetTransactionReportsInput} from '@/domain/report/repositories/GetTransactionReportsRepository';
import {GetTransactionReportSummaryInput} from '@/domain/report/repositories/GetTransactionReportSummaryRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {Can} from '@/view/auth/components/organisms/rbac';
import InputSearch from '@/view/common/components/atoms/input/search';
import NavDrawer from '@/view/common/components/molecules/nav-drawer';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {defineds} from '@/view/common/utils/date';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {dateFormatter, toUnix} from '@/view/common/utils/UtilsdateFormatter';
import {DownloadFile} from '@/view/common/utils/UtilsDownloadExcel';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {Button} from 'posy-fnb-core';
import React, {useEffect, useMemo, useState} from 'react';

import {useDownloadTransactionReportsViewModel} from '../../view-models/GetDownloadTransactionReportsViewModel';
import {useGetTransactionReportSummaryViewModel} from '../../view-models/GetTransactionReportSummaryViewModel';
import {useGetTransactionReportsViewModel} from '../../view-models/GetTransactionReportsViewModel';
import ReportSummary from '../organisms/summary';
import ReportTable from '../organisms/table';

const Datepicker = dynamic(
	() => import('@/view/common/components/atoms/input/datepicker'),
	{
		loading: () => <div />,
	},
);

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

	const queryDownload: GetDownloadTransactionReportInput = useMemo(() => {
		return {
			start_date: toUnix(date[0].startDate),
			end_date: toUnix(date[0].endDate),
			filter: [
				{
					field: 'restaurant_outlet_uuid',
					value: outletId || 'all',
				},
				{
					field: 'payment_method_uuid',
					value: '',
				},
				{
					field: 'transaction_category',
					value: 'all',
				},
			],
		};
	}, [outletId, date]);

	const queryReport = useMemo(() => {
		return {
			limit: Number(query.limit) || 10,
			page: Number(query.page) || 1,
			search: [
				{
					field: 'status',
					value: 'PAID|REFUND',
				},
				{
					field: 'keyword',
					value: (query.search as string) || '',
				},
				{
					field: 'created_at',
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
		data: dataReports,
		isLoading: loadDataReports,
		pagination,
	} = useGetTransactionReportsViewModel(
		queryReport as GetTransactionReportsInput,
		{
			enabled: outletId?.length > 0 && isSubscription && isLoggedIn,
		},
	);

	const {data: dataSummary, isLoading: loadSummary} =
		useGetTransactionReportSummaryViewModel(
			queryReport as GetTransactionReportSummaryInput,
			{
				enabled: outletId?.length > 0 && isSubscription && isLoggedIn,
			},
		);

	const {downloadReport, isLoading} = useDownloadTransactionReportsViewModel({
		onSuccess(response, _variables) {
			const {data: responseDownloadReport} = response as Response<string>;
			const variables = _variables as GetDownloadTransactionReportInput;
			DownloadFile(
				responseDownloadReport,
				`transaction-report-${dateFormatter(
					parseInt(variables.start_date),
				)}-${dateFormatter(parseInt(variables.end_date))}`,
			);
		},
	});

	const handleDownloadReport = () => {
		downloadReport(queryDownload);
	};

	useEffect(() => {
		logEvent({
			category: 'report',
			action: 'report_view',
		});
	}, []);

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-lg bg-neutral-10 p-4">
			<article>
				<aside className="flex justify-between">
					<NavDrawer title="Report Summary" />
					<Can I="export_excel" an="transaction_report">
						<Button
							size="m"
							isLoading={isLoading}
							onClick={() => {
								handleDownloadReport();
							}}
						>
							Download Report
						</Button>
					</Can>
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
