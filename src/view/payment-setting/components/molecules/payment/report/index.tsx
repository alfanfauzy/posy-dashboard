import {mapToPaymentReportList} from '@/data/payment/mappers/PaymentMethodMapper';
import {GetPaymentReportKey} from '@/data/payment/sources/GetPaymentReportListQuery';
import {PaymentReportList} from '@/domain/payment/models/payment-report';
import {GetPaymentReportFilter} from '@/domain/payment/repositories/GetPaymentReportList';
import InformationIcon from '@/view/common/assets/icons/information';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {Dates} from '@/view/common/types/date';
import {defineds} from '@/view/common/utils/date';
import {useGetPaymentReportViewModel} from '@/view/payment-setting/view-models/GetPaymentReportViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Table} from 'antd';
import {format, subDays} from 'date-fns';
import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';

import FilterTablePaymentReport from '../../../organism/filterTablePaymentReport';
import PaymentReportColumn from '../../../organism/table/payment-report/Column';
import PaymentReportDetail from '../../modal/payment-report-detail';

const PaymentReportMolecules = () => {
	const {query} = useRouter();
	const queryClient = useQueryClient();

	const {restaurantID} = query;

	const [dataReport, setDataReport] = useState<Array<PaymentReportList>>([]);
	const [loadingTable, setLoadingTable] = useState<boolean>(true);
	const [date, setDate] = useState<Array<Dates>>([
		{
			startDate: defineds.startOfDay,
			endDate: defineds.last7day,
			key: 'selection',
		},
	]);

	const [searchReport, setSearchReport] = useState<
		Array<{field: string; value: string}>
	>([]);
	const [afterId, setAfterId] = useState<string | null>(null);

	const [isOpenModal, {toggle: handleOpenModal}] = useDisclosure({
		initialState: false,
	});
	const [selectedPaymentReport, setSelectedPaymentReport] =
		useState<PaymentReportList>();

	const dateBefore7Days = subDays(defineds.startOfDay, 6);

	const paramQuery: GetPaymentReportFilter = useMemo(
		() => ({
			restaurant_uuid: restaurantID as string,
			start_date: format(dateBefore7Days, 'yyyy-MM-dd'),
			end_date: format(defineds.startOfDay, 'yyyy-MM-dd'),
			limit: 10,
			after_id: afterId as string,
		}),
		[afterId, restaurantID, date],
	);

	const {fetchNextPage, hasNextPage, isFetchingNextPage} =
		useGetPaymentReportViewModel(paramQuery, {
			onSuccess(response) {
				const paymentReportMapper = mapToPaymentReportList(
					response.pages[0].data,
				);

				const allItems = paymentReportMapper.data.flatMap(page => page);

				const isDuplicate = dataReport.some(data =>
					allItems.some(item => data.transaction_id === item.transaction_id),
				);

				if (!isDuplicate) {
					setDataReport(currentState => currentState.concat(allItems));
				}

				setLoadingTable(false);
			},
			getNextPageParam: lastPage => {
				if (lastPage?.data?.has_more) {
					const linkNextPage =
						lastPage.data.links.map(link => link.href)[0] ?? undefined;

					const params = new URLSearchParams(
						linkNextPage.slice(linkNextPage.indexOf('?') + 1),
					);
					const afterID = params.get('after_id');

					setAfterId(afterID);
					return afterID;
				}

				return undefined;
			},
			keepPreviousData: true,
		});

	useEffect(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage]);

	useEffect(() => {
		queryClient.resetQueries([GetPaymentReportKey]);
	}, []);

	const filterData = useMemo(() => {
		// If doesn't have any search return data Report
		if (searchReport.length === 0) return dataReport;

		return dataReport.filter(item => {
			return searchReport.every(filter => {
				// if filter field is transaction_id filter the value with includes
				if (filter.field === 'transaction_id') {
					return item.transaction_id.includes(filter.value.toUpperCase());
				}
				return item[filter.field as keyof PaymentReportList] === filter.value;
			});
		});
	}, [dataReport, searchReport]);

	return (
		<>
			<div className="mt-4 w-auto justify-between gap-5 rounded-tr-md rounded-tl-md border border-gray-200 bg-white p-4">
				<h2 className="mb-4 text-l-bold">Payment Report</h2>
				<FilterTablePaymentReport
					rangeDate={date}
					setRangeDate={setDate}
					setAfterId={setAfterId}
					searchReport={searchReport}
					setSearchReport={setSearchReport}
				/>
				<Table
					columns={PaymentReportColumn({
						setSelectedPaymentReport,
						handleOpenModal,
					})}
					dataSource={filterData}
					loading={loadingTable || isFetchingNextPage}
					pagination={false}
				/>
			</div>
			<section className="flex items-center gap-1 rounded-br-md rounded-bl-md border p-4">
				<div className="text-secondary-main">
					<InformationIcon color="#654DE4" />
				</div>
				<p className="text-m-semibold">
					This report only shows the transaction for the last 7 days
				</p>
			</section>

			{isOpenModal && (
				<PaymentReportDetail
					isOpen={isOpenModal}
					onClose={handleOpenModal}
					key={selectedPaymentReport?.id}
					selectedPaymentReport={selectedPaymentReport}
				/>
			)}
		</>
	);
};

export default PaymentReportMolecules;
