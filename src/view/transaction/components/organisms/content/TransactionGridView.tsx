/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {QrCode} from '@/domain/qr-code/model';
import {TransactionStatus} from '@/domain/transaction/model';
import {Can} from '@/view/auth/components/organisms/rbac';
import CancelIcon from '@/view/common/assets/icons/cancel';
import PlusCircleIcon from '@/view/common/assets/icons/plusCircle';
import FilterChip from '@/view/common/components/atoms/chips/filter-chip';
import InputSearch from '@/view/common/components/atoms/input/search';
import {handlePlayAudio} from '@/view/common/components/templates/layout';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangePayment,
	onChangeSearch,
	onChangeSelectedTrxId,
	onClearSearch,
} from '@/view/common/store/slices/transaction';
import {useCreateTransactionViewModel} from '@/view/transaction/view-models/CreateTransactionViewModel';
import {useGetTransactionSummaryViewModel} from '@/view/transaction/view-models/GetTransactionSummaryViewModel';
import {useGetTransactionsViewModel} from '@/view/transaction/view-models/GetTransactionsViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Skeleton} from 'antd';
import {closeSnackbar, useSnackbar} from 'notistack';
import {Button, Loading} from 'posy-fnb-core';
import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineFullscreen} from 'react-icons/ai';
import {useProSidebar} from 'react-pro-sidebar';
import {useReactToPrint} from 'react-to-print';

import CreateTransactionModal from '../modal/CreateTransactionModal';
import PrintQrCodeReceipt from '../receipt/PrintQrCodeReceipt';

export const requestFullScreen = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const element: any = document.body;

	const requestMethod =
		element.requestFullscreen ||
		element.webkitRequestFullScreen ||
		element.mozRequestFullScreen ||
		element.msRequestFullScreen;

	if (requestMethod) {
		requestMethod?.call(element);
	}
};

const generateBorderColor = (
	status: string,
	trxId: string,
	selectedTrxId: string,
	firstOrderAt: number,
	isWaitingFood: boolean,
) => {
	const now = Date.now();
	const diffTime = Math.abs(now - firstOrderAt * 1000);
	const diffMinutes = Math.floor(diffTime / 60000);

	if (isWaitingFood && diffMinutes > 10) {
		return 'border-2 border-error';
	}

	if (trxId === selectedTrxId) {
		return 'border-2 border-primary-main';
	}

	const borderColor: Record<string, string> = {
		WAITING_FOOD: 'border-2 border-blue-success',
		WAITING_PAYMENT: 'border-2 border-green-success',
	};
	return borderColor[status];
};

type TransactionGridViewProps = {
	openTableCapacity: () => void;
};

const TransactionGridView = ({openTableCapacity}: TransactionGridViewProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();
	const {selectedTrxId, search} = useAppSelector(state => state.transaction);
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);
	const {collapseSidebar, collapsed} = useProSidebar();
	const {width} = useViewportListener();

	const [openSearch, {open, close}] = useDisclosure({initialState: false});
	const [openModalTransaction, setOpenModalTransaction] = useState(false);

	const [status, setStatus] = useState('');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const qrRef = useRef<any>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const audioRef = useRef<any>();

	const play = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	const handlePrint = useReactToPrint({
		content: () => qrRef.current,
	});

	const {
		data: dataQr,
		createTransaction,
		isLoading: loadCreateTransaction,
	} = useCreateTransactionViewModel({
		onSuccess: data => {
			const dt = data as QrCode;
			if (data) {
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
					value: status || 'WAITING_FOOD|WAITING_PAYMENT|WAITING_ORDER',
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

	const {data: dataSummary, isLoading: loadSummary} =
		useGetTransactionSummaryViewModel(
			{
				restaurant_outlet_uuid: outletId,
			},
			{
				enabled: outletId?.length > 0 && isSubscription && isLoggedIn,
			},
		);

	const handleSetStatus = (
		e: React.MouseEvent<HTMLElement>,
		statusParams: string,
	) => {
		if (status === statusParams) {
			setStatus('');
		} else {
			setStatus(statusParams);
		}
	};

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(onChangeSearch({search: e.target.value}));
	};

	const onClear = () => {
		dispatch(onClearSearch());
		close();
	};

	const handleSelectTrx = (trxId: string) => {
		if (width <= 1280) {
			collapseSidebar(true);
		}
		dispatch(onChangeSelectedTrxId({id: trxId}));
		dispatch(
			onChangePayment({
				payment: {
					discount_percentage: 0,
					subtotal: 0,
					total: 0,
				},
			}),
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			data?.map(el => {
				const now = Date.now();
				const diffTime = Math.abs(now - el.first_order_at * 1000);
				const diffMinutes = Math.floor(diffTime / 60000);
				const checktime = diffMinutes > 0 && diffMinutes % 2 === 0;
				// console.log(diffMinutes, checktime, idx);
				if (el.status === TransactionStatus.WAITING_FOOD && checktime) {
					// console.log({diffMinutes}, idx);
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
	}, [data]);

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
	}, [data]);

	const handleCloseModalCreateTransaction = (value: boolean) => {
		setOpenModalTransaction(value);
	};

	return (
		<section className="relative h-full w-full flex flex-col xl:gap-4 overflow-hidden rounded-2xl bg-neutral-10 p-6">
			<article className="h-fit">
				<aside className="flex items-start justify-between">
					<p className="text-xxl-semibold text-neutral-100 lg:text-heading-s-semibold">
						Restaurant Transaction
					</p>

					<div>
						<AiOutlineFullscreen
							onClick={requestFullScreen}
							className="cursor-pointer hover:opacity-70"
							size={24}
						/>
					</div>
				</aside>

				{loadSummary && (
					<div className="mt-2">
						<Skeleton paragraph={{rows: 1, width: '100%'}} title={false} />
					</div>
				)}
				{dataSummary && (
					<aside className="mt-2 flex gap-2 w-full justify-between">
						<div className="flex gap-2 max-w-[100px] md:max-w-[285px] lg:max-w-xs xl:max-w-none overflow-auto">
							<FilterChip
								label={`Waiting Food: ${dataSummary?.waiting_food}`}
								openSearch={openSearch}
								onClick={e =>
									handleSetStatus(e, TransactionStatus.WAITING_FOOD)
								}
								className={`${
									status === TransactionStatus.WAITING_FOOD
										? 'border-2 border-blue-success'
										: 'border-neutral-50 '
								}`}
							/>
							<FilterChip
								label={`Waiting Payment: ${dataSummary?.waiting_payment}`}
								openSearch={openSearch}
								onClick={e =>
									handleSetStatus(e, TransactionStatus.WAITING_PAYMENT)
								}
								className={`${
									status === TransactionStatus.WAITING_PAYMENT
										? 'border-2 border-green-success'
										: 'border-neutral-50 '
								}`}
							/>
							<FilterChip
								label={`Table Capacity: ${dataSummary.available_capacity}/${dataSummary.table_capacity}`}
								openSearch={openSearch}
								onClick={openTableCapacity}
							/>
							<InputSearch
								isTransaction
								isOpen={openSearch}
								open={open}
								onSearch={onSearch}
								onClearSearch={onClear}
								search={search}
							/>
						</div>

						<div className="w-36">
							<Can I="create" an="transaction">
								<Button
									onClick={() => handleCreateTransaction(outletId)}
									size="m"
									fullWidth
									variant="primary"
									isLoading={loadCreateTransaction}
									className="!px-0"
								>
									<p className="whitespace-nowrap text-s-semibold">
										+ New transaction
									</p>
								</Button>
							</Can>
						</div>
					</aside>
				)}
			</article>

			<article className="h-[80%] w-full overflow-y-auto mb-8">
				{loadData && (
					<article className="flex h-full items-center justify-center">
						<Loading size={90} />
					</article>
				)}
				{data && data.length === 0 && (
					<article className="flex h-full items-center justify-center rounded-md bg-neutral-20">
						<div
							role="presentation"
							onClick={
								!loadCreateTransaction
									? () => handleCreateTransaction(outletId)
									: () => undefined
							}
							className="flex flex-col items-center gap-3"
						>
							<PlusCircleIcon className="cursor-pointer transition-all duration-300 ease-in-out hover:opacity-60" />
							<p className="cursor-pointer text-l-medium text-neutral-60 transition-all duration-300 ease-in-out hover:opacity-60">
								Create new transaction
							</p>
						</div>
					</article>
				)}
				{data && (
					<article
						className={`${
							data.length === 0
								? 'flex items-center justify-center bg-neutral-20'
								: `grid gap-3 ${
										width > 1280 && !collapsed
											? 'grid-cols-5'
											: width > 1280 && collapsed
											? 'grid-cols-6'
											: selectedTrxId?.length > 0 && width <= 1280
											? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
											: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
								  }`
						}`}
					>
						{data.length > 0 &&
							data.map(el => (
								<aside key={el.uuid} className="relative">
									{el.total_order > 0 && el.need_print_to_kitchen && (
										<div className="w-4 h-4 absolute right-0 top-0 rounded-full bg-error" />
									)}
									<div
										onClick={() => handleSelectTrx(el.uuid)}
										role="presentation"
										className={`h-[124px] cursor-pointer rounded-2xl border p-4 shadow-sm duration-300 ease-in-out hover:border-primary-main active:shadow-md ${generateBorderColor(
											status,
											el.uuid,
											selectedTrxId,
											el.first_order_at,
											el.status === TransactionStatus.WAITING_FOOD,
										)}`}
									>
										<div className="flex justify-center border-b pb-2">
											<p className="text-4xl font-normal text-neutral-70">
												{`${el.table_number}${el.session_suffix}` || '-'}
											</p>
										</div>
										<div className="mt-2">
											<p className="text-s-semibold text-neutral-90">Name</p>
											<p className="text-m-regular text-neutral-90 line-clamp-1">
												{el.customer_name || '-'}
											</p>
										</div>
									</div>
								</aside>
							))}
					</article>
				)}
			</article>

			<article className="absolute bottom-0 py-3 flex w-[91%] gap-4 border-t">
				<div className="flex items-center gap-1">
					<div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-blue-success" />
					<p className="text-s-semibold">Waiting Food</p>
				</div>

				<div className="flex items-center gap-1">
					<div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-green-success" />
					<p className="text-s-semibold">Waiting Payment</p>
				</div>

				<div className="flex items-center gap-1">
					<div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-error" />
					<p className="text-s-semibold">Check to Kitchen</p>
				</div>
			</article>

			{dataQr && <PrintQrCodeReceipt data={dataQr} printReceiptRef={qrRef} />}
			<audio ref={audioRef} src="/sounds/notif.mp3" />

			{openModalTransaction && (
				<CreateTransactionModal
					open={openModalTransaction}
					handleClose={handleCloseModalCreateTransaction}
				/>
			)}
		</section>
	);
};

export default TransactionGridView;
