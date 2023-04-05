import {ReportSummary} from '@/domain/report/model';
import {toRupiah} from '@/utils/common';
import {Skeleton} from 'antd';
import React from 'react';

import ReportSummaryCard from '../../molecules/card';

type ReportSummaryProps = {
	data: ReportSummary | undefined;
	isLoading: boolean;
};

const ReportSummary = ({data, isLoading}: ReportSummaryProps) => {
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
			<aside className="mt-4 grid grid-cols-4 gap-6">
				<ReportSummaryCard
					title="Total sales"
					value={toRupiah(data.total_price_transaction)}
				/>
				<ReportSummaryCard
					title="Total item sold"
					value={data.total_order_qty.toString()}
				/>
				<ReportSummaryCard
					title="Total transaction"
					value={data.total_transaction.toString()}
				/>
				<ReportSummaryCard
					title="Most selling product"
					value={data.most_selling_product || '-'}
				/>
			</aside>
		);
	}

	return <div />;
};

export default ReportSummary;
