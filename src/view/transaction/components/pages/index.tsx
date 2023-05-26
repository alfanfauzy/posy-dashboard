import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppSelector} from '@/view/common/store/hooks';
import TransactionGridView from '@/view/transaction/components/organisms/content/TransactionGridView';
import TransactionSidebaBar from '@/view/transaction/components/templates/transaction-sidebar';
import React from 'react';
import {useProSidebar} from 'react-pro-sidebar';

import TableGridView from '../organisms/content/TableGridView';

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

	return (
		<main className={`flex h-full gap-4 overflow-x-hidden overflow-y-hidden`}>
			<section
				className={`py-4 flex-1 ${generateWidth(
					width,
					selectedTrxId,
					collapsed,
				)}`}
			>
				<TransactionGridView openTableCapacity={openTableCapacity} />
			</section>

			{selectedTrxId && (
				<section
					className={`duration-300 ${
						width <= 1280 && !collapsed ? 'translate-x-60 opacity-0 hidden' : ''
					} `}
				>
					<TransactionSidebaBar />
				</section>
			)}
			{isOpenTableCapacity && (
				<TableGridView closeTableCapacity={closeTableCapacity} />
			)}
		</main>
	);
};

export default ViewTransactionPage;
