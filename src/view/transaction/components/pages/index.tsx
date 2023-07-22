import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppSelector} from '@/view/common/store/hooks';
import dynamic from 'next/dynamic';
import React from 'react';
import {useProSidebar} from 'react-pro-sidebar';

import {generateWidth} from '../../utils/common';

const TransactionSection = dynamic(
	() => import('@/view/transaction/components/templates/transaction-section'),
	{
		loading: () => <div />,
	},
);

const TransactionSidebabar = dynamic(
	() => import('../templates/transaction-sidebar'),
	{
		loading: () => <div />,
	},
);

const TableCapacity = dynamic(() => import('../organisms/table-capacity'), {
	loading: () => <div />,
});

const NotificationSidebar = dynamic(
	() => import('../templates/notification-sidebar'),
	{
		loading: () => <div />,
	},
);

const ViewTransactionPage = () => {
	const {width} = useViewportListener();
	const {selectedTrxId, isOpenNotifBar, isOpenTableCapacity} = useAppSelector(
		state => state.transaction,
	);
	const {collapsed} = useProSidebar();

	return (
		<main className={`flex h-full gap-2 overflow-x-hidden overflow-y-hidden`}>
			<section
				className={`flex-1 ${generateWidth(width, selectedTrxId, collapsed)}`}
			>
				<TransactionSection />
			</section>

			<section>
				{isOpenNotifBar && <NotificationSidebar />}
				{selectedTrxId && <TransactionSidebabar />}
			</section>
			{isOpenTableCapacity && <TableCapacity />}
		</main>
	);
};

export default ViewTransactionPage;
