import {Transaction} from '@/domain/transaction/model';
import Table from '@/view/common/components/atoms/table';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {Dates} from '@/view/common/types/date';
import {toUnix} from '@/view/common/utils/UtilsdateFormatter';
import {useGetTransactionsViewModel} from '@/view/transaction/view-models/GetTransactionsViewModel';
import {useRouter} from 'next/router';
import React from 'react';

import HistoryDetailModal from '../modal/history-detail';
import {HistoryTablecolumns} from './Columns';

type HistoryTableProps = {
	date: Array<Dates>;
};

const HistoryTable = ({date}: HistoryTableProps) => {
	const {query} = useRouter();
	const [isOpenDetail, {close, open}, {setValueState, valueState}] =
		useDisclosure<Transaction>({
			initialState: false,
		});

	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);

	const {
		data,
		isLoading: loadDataHistory,
		pagination,
	} = useGetTransactionsViewModel(
		{
			limit: Number(query.limit) || 10,
			page: Number(query.page) || 1,
			search: [
				{
					field: 'status',
					value: 'PAID|CANCELLED',
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
		},
		{
			enabled: outletId.length > 0 && isSubscription && isLoggedIn,
		},
	);

	const handleOpenDetails = (record: Transaction) => {
		open();
		setValueState(record);
	};

	return (
		<article className="mt-6">
			<Table
				paginationData={pagination}
				columns={HistoryTablecolumns({handleOpenDetails})}
				dataSource={data}
				scroll={{y: '54vh', x: 1100}}
				loading={loadDataHistory}
			/>
			{isOpenDetail && valueState && (
				<HistoryDetailModal
					record={valueState}
					close={close}
					isOpen={isOpenDetail}
				/>
			)}
		</article>
	);
};

export default HistoryTable;
