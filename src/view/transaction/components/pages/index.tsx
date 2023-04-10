import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppSelector} from '@/view/common/store/hooks';
import OrganismsContentsTransaction from '@/view/transaction/components/organisms/list';
import TransactionSidebaBar from '@/view/transaction/components/templates/transaction-sidebar';
import React, {useRef} from 'react';

const ViewTransactionPage = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
