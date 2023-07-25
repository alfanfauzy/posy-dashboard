import InputSearch from '@/view/common/components/atoms/input/search';
import NavDrawer from '@/view/common/components/molecules/nav-drawer';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {Dates} from '@/view/common/types/date';
import {defineds} from '@/view/common/utils/date';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

import HistoryTable from '../organisms/table';

const Datepicker = dynamic(
	() => import('@/view/common/components/atoms/input/datepicker'),
	{
		loading: () => <div />,
	},
);

const PagesHistory = () => {
	const {query} = useRouter();

	const [isOpenFilterDate, {open: openFilterDate, close: closeFilterDate}] =
		useDisclosure({initialState: false});

	const [date, setDate] = useState<Array<Dates>>([
		{
			startDate: defineds.startOfDay,
			endDate: defineds.endOfDay,
			key: 'selection',
		},
	]);

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-lg bg-neutral-10 p-4">
			<article>
				<NavDrawer title="History" />
				<aside className="mt-6">
					<div className="mt-1 flex items-center space-x-4">
						<Datepicker
							dateProps={date}
							close={closeFilterDate}
							open={openFilterDate}
							isOpen={isOpenFilterDate}
							handleChange={(item: Dates) => setDate([item])}
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
			</article>

			<HistoryTable date={date} />
		</main>
	);
};

export default PagesHistory;
