import {GetCancellationReportsInput} from '@/domain/report-cancellation/repositories/GetCancellationReportRepository';
import {GetCancellationReportSummaryInput} from '@/domain/report-cancellation/repositories/GetCancellationSummaryRepository';
import InputSearch from '@/view/common/components/atoms/input/search';
import AtomSelect from '@/view/common/components/atoms/select';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {defineds} from '@/view/common/utils/date';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {toUnix} from '@/view/common/utils/UtilsdateFormatter';
import {useGetOutletSelectionViewModel} from '@/view/outlet/view-models/GetOutletSelectionViewModel';
import {useGetCancellationReportSummaryViewModel} from '@/view/report/view-models/GetCancellationReportSummaryViewModel';
import {useGetCancellationReportsViewModel} from '@/view/report/view-models/GetCancellationReportsViewModel';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import React, {useEffect, useMemo, useState} from 'react';

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
	const [outletOpt, setOutletOpt] = useState('');
	const {isSubscription, isLoggedIn} = useAppSelector(state => state.auth);

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
					field: 'restaurant_outlet_uuid',
					value: outletOpt,
				},
				{
					field: 'cancel_reason',
					value:
						'CUSTOMER_CANCELLATION|OUT_OF_STOCK|LONG_WAITING|WRONG_ORDER|OTHER',
				},
				{
					field: 'created_at',
					value: `${toUnix(date[0].startDate)}&&${toUnix(date[0].endDate)}`,
				},
				{
					field: 'keyword',
					value: (query.search as string) || '',
				},
			],
		};
	}, [query, outletOpt, date]);

	const {
		data: dataCancellationReports,
		isLoading: loadCancellationDataReports,
		pagination,
	} = useGetCancellationReportsViewModel(queryCancellationReport, {
		enabled: outletOpt !== '' && isSubscription && isLoggedIn,
	});

	const {data: dataSummary, isLoading: loadSummary} =
		useGetCancellationReportSummaryViewModel(
			queryCancellationReport as GetCancellationReportSummaryInput,
			{
				enabled: outletOpt !== '' && isSubscription && isLoggedIn,
			},
		);

	const {data: dataOutletSelection} = useGetOutletSelectionViewModel({
		enabled: isLoggedIn && isSubscription,
	});

	const outletOptions = useMemo(() => {
		if (!dataOutletSelection) return [];

		const outlets = dataOutletSelection.map(outlet => ({
			label: `Outlet: ${outlet.outlet_name}`,
			value: outlet.uuid,
		}));

		return [{label: 'Outlet: All', value: 'all'}, ...outlets];
	}, [dataOutletSelection]);

	const handleSelectChange = (value: string) => {
		setOutletOpt(value);
	};

	useEffect(() => {
		setOutletOpt(outletOptions[0].value);
	}, [outletOptions]);

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-lg bg-neutral-10 p-4">
			<article>
				<aside className="flex justify-between">
					<p className="text-xxl-semibold text-neutral-100 ">
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
						{dataOutletSelection && (
							<AtomSelect
								options={outletOptions}
								onChange={handleSelectChange}
							/>
						)}
						<div className="w-1/3">
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
