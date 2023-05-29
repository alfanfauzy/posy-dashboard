import {CancellationSummary} from '@/domain/report-cancellation/model';
import {toRupiah} from '@/view/common/utils/common';
import {Skeleton} from 'antd';
import React from 'react';

import ReportSummaryCard from '../../../molecules/card';

type ReportSummaryCancellationProps = {
	data: CancellationSummary | undefined;
	isLoading: boolean;
};

const ReportSummaryCancellation = ({
	data,
	isLoading,
}: ReportSummaryCancellationProps) => {
	if (isLoading) {
		return (
			<aside className="mt-4 grid grid-cols-4 gap-6">
				{new Array(4).fill(0).map((_, index) => (
					<Skeleton key={index} paragraph={{rows: 2}} />
				))}
			</aside>
		);
	}

	if (data) {
		return (
			<aside className="mt-4 grid grid-cols-5 gap-6">
				<ReportSummaryCard
					title="Out of stock"
					value={data.out_of_stock.toString() || '-'}
				/>
				<ReportSummaryCard
					title="Customer cancellation "
					value={data.customer_cancellation.toString() || '-'}
				/>
				<ReportSummaryCard
					title="Long waiting time"
					value={data.long_waiting.toString() || '-'}
				/>
				<ReportSummaryCard
					title="Wrong Order"
					value={data.wrong_order.toString() || '-'}
				/>
				<ReportSummaryCard
					title="Others"
					value={data.others.toString() || '-'}
				/>
			</aside>
		);
	}

	return <div />;
};

export default ReportSummaryCancellation;
