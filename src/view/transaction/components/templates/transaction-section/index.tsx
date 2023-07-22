import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {QrCode} from '@/domain/qr-code/model';
import {TransactionStatus} from '@/domain/transaction/model';
import CancelIcon from '@/view/common/assets/icons/cancel';
import {handlePlayAudio} from '@/view/common/components/templates/layout';
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
import {closeSnackbar, useSnackbar} from 'notistack';
import React, {useEffect, useRef} from 'react';
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

import TransactionHeader from '../../organisms/transaction-header';
import TransactionView from '../transaction-view';

const TransactionSection = () => {
	const dispatch = useAppDispatch();
	const {collapsed} = useProSidebar();
	const queryClient = useQueryClient();
	const {width} = useViewportListener();
	const {enqueueSnackbar} = useSnackbar();
	const {search, status, selectedTrxId} = useAppSelector(
		state => state.transaction,
	);
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);

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
				setTimeout(() => {
					handlePrint();
					dispatch(onChangeIsOpenCreateTransaction(true));
				}, 100);
				dispatch(onChangeSelectedTrxId({id: dt.uuid}));
			}
		},
	});

	const handleCreateTransaction = (restaurantOutletId: string) => {
		createTransaction({restaurant_outlet_uuid: restaurantOutletId});
	};

	const play = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			data?.map(el => {
				const now = Date.now();
				const diffTime = Math.abs(now - el.first_order_at * 1000);
				const diffMinutes = Math.floor(diffTime / 60000);
				const checktime = diffMinutes > 0 && diffMinutes % 2 === 0;
				if (el.status === TransactionStatus.WAITING_FOOD && checktime) {
					handlePlayAudio(play);

					enqueueSnackbar({
						className: 'border-t-8 border-blue-success',
						style: {
							borderRadius: '8px',
							background: '#ffffff',
							color: '#0A0A0A',
						},
						action: snackbarId => (
							<div className="mr-2">
								<CancelIcon
									onClick={() => {
										closeSnackbar(snackbarId);
									}}
								/>
							</div>
						),
						autoHideDuration: 1000 * 10,
						message: `Need: print to kitchen on table ${el.table_number}`,
						variant: 'info',
						anchorOrigin: {
							horizontal: 'right',
							vertical: 'top',
						},
					});
					return el;
				}
			});
		}, 1000 * 60);

		return () => clearInterval(interval);
	}, [data, enqueueSnackbar]);

	useEffect(() => {
		const interval = setInterval(() => {
			data?.map(el => {
				const now = Date.now();
				const diffTime = Math.abs(now - el.first_order_at * 1000);
				const diffMinutes = Math.floor(diffTime / 60000);
				const checktime = diffMinutes === 1;

				if (el.status === TransactionStatus.WAITING_FOOD && checktime) {
					handlePlayAudio(play);
					enqueueSnackbar({
						className: 'border-t-8 border-error',
						style: {
							borderRadius: '8px',
							background: '#ffffff',
							color: '#0A0A0A',
						},
						action: snackbarId => (
							<div className="mr-2">
								<CancelIcon
									onClick={() => {
										closeSnackbar(snackbarId);
									}}
								/>
							</div>
						),
						autoHideDuration: 1000 * 10,
						message: `Please check order time on table ${el.table_number}`,
						variant: 'info',
						anchorOrigin: {
							horizontal: 'right',
							vertical: 'top',
						},
					});
					return el;
				}
			});
		}, 1000 * 60);

		return () => clearInterval(interval);
	}, [data, enqueueSnackbar]);

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

				{dataQr && <PrintQrCodeReceipt data={dataQr} printReceiptRef={qrRef} />}
				<audio ref={audioRef} src="/sounds/notif.mp3" />
			</div>
		</section>
	);
};

export default TransactionSection;
