import useViewportListener from '@/hooks/useViewportListener';
import {useAppSelector} from '@/store/hooks';
import OrganismsContentsTransaction from '@/view/transaction/components/organisms/list';
import TransactionSidebaBar from '@/view/transaction/components/templates/transaction-sidebar';
import React, {useRef} from 'react';

const ViewTransactionPage = () => {
	const componentRef = useRef<any>();
	const {width} = useViewportListener();
	const {showSidebar} = useAppSelector(state => state.auth);

	return (
		<main className="flex h-full gap-4 overflow-hidden">
			<OrganismsContentsTransaction componentRef={componentRef} />

			{width > 1200 && <TransactionSidebaBar qrRef={componentRef} />}
			{width <= 1200 && !showSidebar && (
				<TransactionSidebaBar qrRef={componentRef} />
			)}
		</main>
	);
};

export default ViewTransactionPage;
