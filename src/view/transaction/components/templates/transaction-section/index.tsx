import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {Area} from '@/domain/area/model';
import {QrCode} from '@/domain/qr-code/model';
import {TransactionStatus} from '@/domain/transaction/model';
import {useGetAreasViewModel} from '@/view/area-management/view-models/GetAreasViewModel';
import CancelIcon from '@/view/common/assets/icons/cancel';
import {handlePlayAudio} from '@/view/common/components/templates/layout';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import {useCreateTransactionViewModel} from '@/view/transaction/view-models/CreateTransactionViewModel';
import {useGetTransactionsViewModel} from '@/view/transaction/view-models/GetTransactionsViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {closeSnackbar, useSnackbar} from 'notistack';
import React, {useEffect, useRef, useState} from 'react';
import {useReactToPrint} from 'react-to-print';

import CreateTransactionModal from '../../organisms/modal/CreateTransactionModal';
import PrintQrCodeReceipt from '../../organisms/receipt/PrintQrCodeReceipt';
import TransactionHeader from '../../organisms/transaction-header';
import TransactionView from '../transaction-view';

type TransactionSectionProps = {
	openTableCapacity: () => void;
	openNotifBar: () => void;
	closeNotifBar: () => void;
	isOpenNotifBar: boolean;
};

const TransactionSection = ({
	openTableCapacity,
	openNotifBar,
	closeNotifBar,
	isOpenNotifBar,
}: TransactionSectionProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();
	const {search} = useAppSelector(state => state.transaction);
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const qrRef = useRef<any>();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const audioRef = useRef<any>();

	const [openModalTransaction, setOpenModalTransaction] = useState(false);
	const [selectedArea, setSelectedArea] = useState<Area>();
	const [status, setStatus] = useState('');
	const [viewType, setViewType] = useState('table');

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

	const {data: dataArea} = useGetAreasViewModel(
		{
			restaurant_outlet_uuid: outletId,
			show_waiting_food: true,
		},
		{
			onSuccess: dt => {
				setSelectedArea(dt.data.objs[0]);
			},
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
					setOpenModalTransaction(true);
				}, 100);
				dispatch(onChangeSelectedTrxId({id: dt.uuid}));
			}
		},
	});

	const handleCreateTransaction = (restaurantOutletId: string) => {
		createTransaction({restaurant_outlet_uuid: restaurantOutletId});
	};

	const onChangeSelectArea = (val: Area) => {
		setSelectedArea(val);
		// setSelectedTable(null);
	};

	const onChangeViewType = (val: string) => setViewType(val);

	const play = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	const handleCloseModalCreateTransaction = (value: boolean) => {
		setOpenModalTransaction(value);
	};

	const onChangeStatus = (val: string) => setStatus(val);

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
		<section className="relative h-full w-full flex flex-col xl:gap-4 overflow-hidden rounded-lg bg-neutral-10 p-4">
			<TransactionHeader
				status={status}
				openNotifBar={openNotifBar}
				onChangeStatus={onChangeStatus}
				isOpenNotifBar={isOpenNotifBar}
				openTableCapacity={openTableCapacity}
				loadCreateTransaction={loadCreateTransaction}
				handleCreateTransaction={handleCreateTransaction}
				onChangeViewType={onChangeViewType}
			/>

			<TransactionView
				dataTransaction={data}
				loadTransaction={loadData}
				closeNotifBar={closeNotifBar}
				loadCreateTransaction={loadCreateTransaction}
				handleCreateTransaction={handleCreateTransaction}
				dataArea={dataArea}
				selectedArea={selectedArea}
				onChangeSelectArea={onChangeSelectArea}
				viewType={viewType}
			/>

			<audio ref={audioRef} src="/sounds/notif.mp3" />

			{dataQr && <PrintQrCodeReceipt data={dataQr} printReceiptRef={qrRef} />}

			{openModalTransaction && (
				<CreateTransactionModal
					open={openModalTransaction}
					handleClose={handleCloseModalCreateTransaction}
				/>
			)}
		</section>
	);
};

export default TransactionSection;
