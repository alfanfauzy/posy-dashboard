import {useAppSelector} from '@/view/common/store/hooks';
import dynamic from 'next/dynamic';
import React from 'react';

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

const NotificationSidebar = dynamic(
	() => import('../templates/notification-sidebar'),
	{
		loading: () => <div />,
	},
);

const TableCapacity = dynamic(() => import('../organisms/table-capacity'), {
	loading: () => <div />,
});

const ViewTransactionPage = () => {
	const {isOpenNotifBar, isOpenTableCapacity, selectedTrxId} = useAppSelector(
		state => state.transaction,
	);

	return (
		<main className="flex h-full gap-2 overflow-x-hidden overflow-y-hidden">
			<TransactionSection />
			{isOpenNotifBar && !selectedTrxId ? <NotificationSidebar /> : null}
			{selectedTrxId && !isOpenNotifBar ? <TransactionSidebabar /> : null}
			{isOpenTableCapacity && <TableCapacity />}
		</main>
	);
};

export default ViewTransactionPage;
