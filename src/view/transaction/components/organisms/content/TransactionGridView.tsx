import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {TransactionStatus} from '@/domain/transaction/model';
import {Can} from '@/view/auth/components/organisms/rbac';
import PlusCircleIcon from '@/view/common/assets/icons/plusCircle';
import FilterChip from '@/view/common/components/atoms/chips/filter-chip';
import InputSearch from '@/view/common/components/atoms/input/search';
import useDisclosure from '@/view/common/hooks/useDisclosure';
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
import {Button, Loading} from 'posy-fnb-core';
import React, {useRef, useState} from 'react';
import {useReactToPrint} from 'react-to-print';

import PrintQrCodeReceipt from '../receipt/PrintQrCodeReceipt';

const generateBorderColor = (
	status: string,
	trxId: string,
	selectedTrxId: string,
) => {
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
	const {selectedTrxId, search} = useAppSelector(state => state.transaction);
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);
	const [openSearch, {open, close}] = useDisclosure({initialState: false});

	const [status, setStatus] = useState('');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const qrRef = useRef<any>();

	const handlePrint = useReactToPrint({
		content: () => qrRef.current,
	});

	const {
		data: dataQr,
		createTransaction,
		isLoading: loadCreateTransaction,
	} = useCreateTransactionViewModel({
		onSuccess: data => {
			if (data) {
				queryClient.invalidateQueries([GetTransactionsQueryKey]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				setTimeout(() => {
					handlePrint();
				}, 100);
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
			enabled: outletId.length > 0 && isSubscription && isLoggedIn,
		},
	);

	const {data: dataSummary, isLoading: loadSummary} =
		useGetTransactionSummaryViewModel(
			{
				restaurant_outlet_uuid: outletId,
			},
			{
				enabled: outletId.length > 0 && isSubscription && isLoggedIn,
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

	return (
		<section className="relative h-full flex-1 overflow-hidden rounded-2xl bg-neutral-10 p-6">
			<article className="h-fit">
				<aside className="flex items-start justify-between">
					<p className="text-xxl-semibold text-neutral-100 lg:text-heading-s-semibold">
						Restaurant Transaction
					</p>
				</aside>

				{loadSummary && (
					<div className="mt-2">
						<Skeleton paragraph={{rows: 1, width: '100%'}} title={false} />
					</div>
				)}
				{dataSummary && (
					<aside className="mt-4 flex gap-2">
						<div
							className={`flex flex-1 overflow-x-auto transition-all duration-500 ease-in-out ${
								openSearch ? '' : 'gap-2'
							}`}
						>
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
								isOpen={openSearch}
								open={open}
								onSearch={onSearch}
								onClearSearch={onClear}
								search={search}
							/>
						</div>

						<div className="w-1/4">
							<Can I="create" an="transaction">
								<Button
									onClick={() => handleCreateTransaction(outletId)}
									size="m"
									fullWidth
									variant="primary"
									isLoading={loadCreateTransaction}
								>
									<p className="whitespace-nowrap">+ New Trx</p>
								</Button>
							</Can>
						</div>
					</aside>
				)}
			</article>

			<article className="h-[80%] w-full overflow-y-auto py-4">
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
								Create New Transaction
							</p>
						</div>
					</article>
				)}
				{data && (
					<article
						className={`${
							data.length === 0
								? 'flex items-center justify-center bg-neutral-20'
								: 'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
						}`}
					>
						{data.length > 0 &&
							data.map(el => (
								<aside
									key={el.uuid}
									onClick={() => handleSelectTrx(el.uuid)}
									role="presentation"
									className={`h-[124px] cursor-pointer rounded-2xl border p-4 shadow-sm duration-300 ease-in-out hover:border-primary-main active:shadow-md ${generateBorderColor(
										status,
										el.uuid,
										selectedTrxId,
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
								</aside>
							))}
					</article>
				)}
			</article>

			<article className="absolute bottom-0 mb-5 flex w-full gap-4">
				<div className="flex items-center gap-1">
					<div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-blue-success" />
					<p className="text-s-semibold">Waiting Food</p>
				</div>

				<div className="flex items-center gap-1">
					<div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-green-success" />
					<p className="text-s-semibold">Waiting Payment</p>
				</div>
			</article>

			{dataQr && <PrintQrCodeReceipt data={dataQr} printReceiptRef={qrRef} />}
		</section>
	);
};

export default TransactionGridView;
