import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppSelector} from '@/view/common/store/hooks';
import dynamic from 'next/dynamic';
import React from 'react';
import {useProSidebar} from 'react-pro-sidebar';

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

const TableGridView = dynamic(
	() => import('../organisms/content/TableGridView'),
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

const generateWidth = (
	width: number,
	selectedTrxId: string,
	collapsed: boolean,
) => {
	if (width <= 1280 && selectedTrxId && !collapsed) {
		return ' w-full duration-300';
	}
	if (width <= 1280 && selectedTrxId) {
		return ' w-fit duration-300';
	}
	return ' w-fit';
};

const ViewTransactionPage = () => {
	const {width} = useViewportListener();
	const {selectedTrxId} = useAppSelector(state => state.transaction);

	const {collapsed} = useProSidebar();

	const [
		isOpenTableCapacity,
		{open: openTableCapacity, close: closeTableCapacity},
	] = useDisclosure({initialState: false});

	const [isOpenNotifBar, {open: openNotifBar, close: closeNotifBar}] =
		useDisclosure({initialState: false});

	return (
		<main className={`flex h-full gap-2 overflow-x-hidden overflow-y-hidden`}>
			<section
				className={`flex-1 ${generateWidth(width, selectedTrxId, collapsed)}`}
			>
				<TransactionSection
					openTableCapacity={openTableCapacity}
					openNotifBar={openNotifBar}
					isOpenNotifBar={isOpenNotifBar}
					closeNotifBar={closeNotifBar}
				/>
			</section>

			<section>
				{isOpenNotifBar && (
					<NotificationSidebar closeNotificationSidebar={closeNotifBar} />
				)}
				{selectedTrxId && <TransactionSidebabar />}
			</section>
			{isOpenTableCapacity && (
				<TableGridView closeTableCapacity={closeTableCapacity} />
			)}
		</main>
	);
};

export default ViewTransactionPage;
