import Table from '@/atoms/table';
import {Reports} from '@/domain/report/model';
import {Pagination} from '@/domain/vo/BasePagination';
import useClickOutside from '@/hooks/useClickOutside';
import useDisclosure from '@/hooks/useDisclosure';
import {Checkbox} from 'posy-fnb-core';
import React, {useMemo, useRef, useState} from 'react';

import {columns, defaultColumns} from './Columns';

type ReportTableProps = {
	data: Reports | undefined;
	isLoading: boolean;
	pagination: Pagination | undefined;
};

const ReportTable = ({data, isLoading, pagination}: ReportTableProps) => {
	const [selectedColumns, setSelectedColumns] = useState(defaultColumns);

	const minifyColumns = useMemo(
		() => selectedColumns.flatMap(col => col.key),
		[selectedColumns],
	);

	const [isOpenFilter, {open: openFilter, close: closeFilter}] = useDisclosure({
		initialState: false,
	});

	const refFilter = useRef(null);
	useClickOutside({
		ref: refFilter,
		handleClick: closeFilter,
		state: isOpenFilter,
	});

	return (
		<article className="mt-6 relative">
			<Table
				paginationData={pagination}
				columns={columns({onClickFilter: openFilter, selectedColumns})}
				dataSource={data}
				scroll={{y: '54vh', x: 1100}}
				loading={isLoading}
			/>
			{isOpenFilter && (
				<div
					ref={refFilter}
					className="bg-white rounded-lg p-4 shadow-xl absolute right-0 top-0"
				>
					<p className="text-m-semibold">Show column:</p>
					<aside className="my-2">
						{defaultColumns.slice(0, defaultColumns.length - 1).map(item => (
							<div key={item.key} className="flex items-center gap-1 -ml-4">
								<Checkbox
									checked={minifyColumns.includes(item.key)}
									onChange={() => {
										if (!minifyColumns.includes(item.key))
											setSelectedColumns(prev => [...prev, item]);
										else
											setSelectedColumns(prev =>
												prev.filter(col => col.key !== item.key),
											);
									}}
									size="m"
								/>
								<p>{item.name}</p>
							</div>
						))}
					</aside>
				</div>
			)}
		</article>
	);
};

export default ReportTable;
