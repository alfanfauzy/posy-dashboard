import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppSelector} from '@/view/common/store/hooks';
import TransactionGridView from '@/view/transaction/components/organisms/content/TransactionGridView';
import TransactionSidebaBar from '@/view/transaction/components/templates/transaction-sidebar';
import React from 'react';

import TableGridView from '../organisms/content/TableGridView';

const ViewTransactionPage = () => {
	const {width} = useViewportListener();
	const {showSidebar} = useAppSelector(state => state.auth);

	const [
		isOpenTableCapacity,
		{open: openTableCapacity, close: closeTableCapacity},
	] = useDisclosure({initialState: false});

	return (
		<main className="flex h-full gap-4 overflow-hidden">
			<TransactionGridView openTableCapacity={openTableCapacity} />

			{width > 1200 && <TransactionSidebaBar />}
			{width <= 1200 && !showSidebar && <TransactionSidebaBar />}
			{isOpenTableCapacity && (
				<TableGridView closeTableCapacity={closeTableCapacity} />
			)}
		</main>
	);
};

export default ViewTransactionPage;
