/* eslint-disable react-hooks/exhaustive-deps */
import {useAppSelector} from '@/view/common/store/hooks';
import {Dates} from '@/view/common/types/date';
import {defineds} from '@/view/common/utils/date';
import {toUnix} from '@/view/common/utils/UtilsdateFormatter';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import {useGetTransactionRatingsViewModel} from '../../view-models/GetTransactionRatingsViewModel';
import NavFilterRating from '../organisms/nav-filter';
import TableRating from '../organisms/table';

const ViewRatingPage = () => {
	const {query} = useRouter();
	const {outletId} = useAppSelector(state => state.auth);
	// const [selectedRowKeys, setSelectedRowKeys] = useState<Array<Key>>([]);

	const [date, setDate] = useState<Array<Dates>>([
		{
			startDate: defineds.startOfMonth,
			endDate: defineds.endOfMonth,
			key: 'selection',
		},
	]);

	useEffect(() => {
		setDate([
			{
				startDate: new Date((query.start_date as string) || date[0].startDate),
				endDate: new Date((query.end_date as string) || date[0].endDate),
				key: 'selection',
			},
		]);
	}, [query.end_date, query.start_date]);

	const {
		data: dataRating,
		pagination,
		isLoading: loadRating,
	} = useGetTransactionRatingsViewModel({
		limit: Number(query.limit) || 10,
		page: Number(query.page) || 1,
		search: [
			{
				field: 'restaurant_outlet_uuid',
				value: outletId,
			},
			{
				field: 'created_at',
				value: `${toUnix(date[0].startDate)}&&${toUnix(date[0].endDate)}`,
			},
		],
		sort: {field: 'created_at', value: 'desc'},
	});

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
			<article>
				<aside className="flex items-start">
					<p className="text-xxl-semibold text-neutral-100 ">Food Ratings</p>
				</aside>
				<NavFilterRating
					// selectedRowKeys={selectedRowKeys}
					// setSelectedRowKeys={setSelectedRowKeys}
					pagination={pagination}
					dates={date}
				/>
			</article>
			<TableRating
				// selectedRowKeys={selectedRowKeys}
				// setSelectedRowKeys={setSelectedRowKeys}
				dataRating={dataRating}
				pagination={pagination}
				loadRating={loadRating}
			/>
		</main>
	);
};

export default ViewRatingPage;
