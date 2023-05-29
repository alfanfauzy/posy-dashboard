import {CancellationReports} from '@/domain/report-cancellation/model';
import {Pagination} from '@/domain/vo/BasePagination';
import Table from '@/view/common/components/atoms/table';
import React from 'react';

import {Columns} from './Columns';

type ReportTableProps = {
	data: CancellationReports | undefined;
	isLoading: boolean;
	pagination: Pagination | undefined;
};

const CancellationTable = ({data, isLoading, pagination}: ReportTableProps) => {
	return (
		<article className="mt-6 relative">
			<Table
				paginationData={pagination}
				columns={Columns}
				dataSource={data}
				scroll={{y: '43vh', x: 1100}}
				loading={isLoading}
			/>
		</article>
	);
};

export default CancellationTable;
