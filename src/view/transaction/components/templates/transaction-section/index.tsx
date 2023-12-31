import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {QrCode} from '@/domain/qr-code/model';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeIsOpenCreateTransaction,
	onChangeSelectedTrxId,
} from '@/view/common/store/slices/transaction';
import {generateWidth} from '@/view/transaction/utils/common';
import {useCreateTransactionViewModel} from '@/view/transaction/view-models/CreateTransactionViewModel';
import {useGetTransactionsViewModel} from '@/view/transaction/view-models/GetTransactionsViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React, {useRef} from 'react';
import {useProSidebar} from 'react-pro-sidebar';
import {useReactToPrint} from 'react-to-print';

const CreateTransactionModal = dynamic(
	() => import('../../organisms/modal/CreateTransactionModal'),
	{
		loading: () => <div />,
	},
);

const PrintQrCodeReceipt = dynamic(
	() => import('../../organisms/receipt/PrintQrCodeReceipt'),
	{
		loading: () => <div />,
	},
);

import useTransactionSectionNotification from '../../../hooks/useTransactionSectionNotification';
import CreateTransactionFromTableModal from '../../organisms/modal/CreateTransactionFromTableModal';
import TransactionHeader from '../../organisms/transaction-header';
import TransactionView from '../transaction-view';

const TransactionSection = () => {
	const dispatch = useAppDispatch();
	const {collapsed} = useProSidebar();
	const queryClient = useQueryClient();
	const {width} = useViewportListener();
	const {search, status, selectedTrxId} = useAppSelector(
		state => state.transaction,
	);
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);
	const {showDigitalMenu} = useAppSelector(state => state.generalSettings);

	const qrRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

	const audioRef =
		useRef<HTMLAudioElement>() as React.MutableRefObject<HTMLAudioElement>;

	const {data, isLoading: loadData} = useGetTransactionsViewModel(
		{
			limit: 100,
			page: 1,
			sort: {
				field: 'table_number',
				value: 'asc',
			},
			search: [
				{
					field: 'status',
					value: status || 'WAITING_FOOD|WAITING_PAYMENT|WAITING_ORDER|PENDING',
				},
				{
					field: 'keyword',
					value: search,
				},
				{
					field: 'restaurant_outlet_uuid',
					value: outletId,
				},
			],
		},
		{
			enabled: outletId?.length > 0 && isSubscription && isLoggedIn,
		},
	);

	useTransactionSectionNotification({
		audioRef,
		data,
	});

	const handlePrint = useReactToPrint({
		content: () => qrRef.current,
	});

	const {
		data: dataQr,
		createTransaction,
		isLoading: loadCreateTransaction,
	} = useCreateTransactionViewModel({
		onSuccess: _dataQr => {
			const dt = _dataQr as QrCode;
			if (_dataQr) {
				queryClient.invalidateQueries([GetTransactionsQueryKey]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				dispatch(onChangeSelectedTrxId({id: dt.uuid}));
				dispatch(onChangeIsOpenCreateTransaction(true));
				if (showDigitalMenu) {
					setTimeout(() => {
						handlePrint();
					}, 100);
				}
			}
		},
	});

	const handleCreateTransaction = (restaurantOutletId: string) => {
		createTransaction({restaurant_outlet_uuid: restaurantOutletId});
	};

	return (
		<section
			className={`flex-1 ${generateWidth(width, selectedTrxId, collapsed)}`}
		>
			<div className="relative h-full w-full flex flex-col xl:gap-4 overflow-hidden rounded-lg bg-neutral-10 p-4">
				<TransactionHeader
					loadCreateTransaction={loadCreateTransaction}
					handleCreateTransaction={handleCreateTransaction}
				/>

				<TransactionView
					dataTransaction={data}
					loadTransaction={loadData}
					loadCreateTransaction={loadCreateTransaction}
					handleCreateTransaction={handleCreateTransaction}
				/>

				<CreateTransactionModal />
				<CreateTransactionFromTableModal />

				{dataQr && <PrintQrCodeReceipt data={dataQr} printReceiptRef={qrRef} />}
				<audio ref={audioRef} src="/sounds/notif.mp3" />
			</div>
		</section>
	);
};

export default TransactionSection;
