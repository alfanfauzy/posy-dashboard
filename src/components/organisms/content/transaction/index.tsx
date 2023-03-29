import FilterChip from '@/atoms/chips/filter-chip';
import InputSearch from '@/atoms/input/search';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {TransactionStatus} from '@/domain/transaction/model';
import useDisclosure from '@/hooks/useDisclosure';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {
	onChangeSearch,
	onChangeSelectedTrxId,
	onClearSearch,
} from '@/store/slices/transaction';
import {useCreateTransactionViewModel} from '@/view/transaction/view-models/CreateTransactionViewModel';
import {useGetTransactionSummaryViewModel} from '@/view/transaction/view-models/GetTransactionSummaryViewModel';
import {useGetTransactionsViewModel} from '@/view/transaction/view-models/GetTransactionsViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Skeleton} from 'antd';
import Image from 'next/image';
import {Button, Loading} from 'posy-fnb-core';
import React, {useState} from 'react';
import {useReactToPrint} from 'react-to-print';
import PlusCircleIcon from 'src/assets/icons/plusCircle';

const generateBorderColor = (
	status: string,
	trxId: string,
	selectedTrxId: string,
) => {
	if (trxId === selectedTrxId) {
		return 'border-2 border-primary-main';
	}
	const borderColor: Record<string, string> = {
		WAITING_ORDER: 'border-2 border-blue-success',
		WAITING_PAYMENT: 'border-2 border-green-success',
	};
	return borderColor[status];
};

type OrganismsContentsTransactionProps = {
	componentRef: React.RefObject<HTMLInputElement>;
};

const OrganismsContentsTransaction = ({
	componentRef,
}: OrganismsContentsTransactionProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {selectedTrxId, search} = useAppSelector(state => state.transaction);
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);
	const [openSearch, {open, close}] = useDisclosure({initialState: false});
	const [status, setStatus] = useState('');

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const {createTransaction, isLoading: loadCreateTransaction} =
		useCreateTransactionViewModel({
			onSuccess: () => {
				queryClient.invalidateQueries([GetTransactionsQueryKey]);
				handlePrint();
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
					value: status,
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
	};

	return (
		<section className="relative h-full flex-1 overflow-hidden rounded-2xl bg-neutral-10 p-6">
			<article className="h-fit">
				<aside className="flex items-start justify-between">
					<p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
						Restaurant Transaction
					</p>
					{/* <div className="flex w-fit cursor-pointer items-center justify-center rounded-3xl border border-neutral-70 px-[18px] py-2 transition-all duration-500 ease-in-out hover:bg-neutral-20">
            <NotificationIcon />
          </div> */}
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
								label={`Waiting Order: ${dataSummary?.waiting_order}`}
								openSearch={openSearch}
								onClick={e =>
									handleSetStatus(e, TransactionStatus.WAITING_ORDER)
								}
								className={`${
									status === TransactionStatus.WAITING_ORDER
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
							<Button
								onClick={() => handleCreateTransaction(outletId)}
								size="m"
								fullWidth
								variant="primary"
								isLoading={loadCreateTransaction}
							>
								<p className="whitespace-nowrap">+ New Trx</p>
							</Button>
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
									className={`h-[124px] cursor-pointer rounded-2xl border p-4 shadow-sm duration-300 ease-in-out hover:border-opacity-70 active:shadow-md ${generateBorderColor(
										status,
										el.uuid,
										selectedTrxId,
									)}`}
								>
									<div className="flex justify-center border-b pb-2">
										<p className="text-4xl font-normal text-neutral-70">
											{el.table_number || '-'}
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
					<p className="text-s-semibold">Waiting Order</p>
				</div>

				<div className="flex items-center gap-1">
					<div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-green-success" />
					<p className="text-s-semibold">Waiting Payment</p>
				</div>
			</article>

			<article className="hidden">
				<section ref={componentRef} className="py-5">
					<div className="flex flex-col items-center justify-center">
						<p className="text-l-semibold">Solaria</p>
						<p className="text-m-regular">Stasiun Gambir</p>
						<Image
							src="/images/logo.png"
							alt="logo"
							width={57}
							height={57}
							className="mt-3 mb-6"
						/>
					</div>
					<div className="border-b border-neutral-40" />
					<div className="mt-6 flex flex-col items-center justify-center">
						<p className="text-m-semibold">QR CODE MENU</p>
						<Image
							src="data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAACT0lEQVR42uyZzW0sIRCEa8SBIyFMKCRmzY+cGKEQAkcOaOqpmrF37RfAwnvLwdKi79Ka7qqijfd5n//yLCR5IbIsZAMCyQNRt2kioALYAITDp4YtJON1MRWwsmw+ubIzubyQWM8SPdt4AFmWCn2LXsWsgPqorRdixVLmA9RR+n3W2LAX+Lz93XIvBmx4fTLA5S2kqo76Pd2DA/34TjHv5Z7lX2dwQB3VhXTz1EVkXlRmGwi4qQiYBG2BPlszWT2zAEtdW7g8G3Zp6CEJIgm4b8+aA5DpJsfDJ6wkqwa7/vSs8QG0wBpdgU+klXkF/sgPrweYVQBhEqR7z7OgPkW1KQA6Xhrsey4SZFxW8DzA13T3WrGX2IcjOw4FsOwV1vbOJDWbmn6EqYDV8WRqmoWGHjhVoftW2gmAhZlKzC1cQJPpyn5jfQjpAMAdD5TtZVxLQV0lQRlhIkBlksqaQPzK9oH+ETCmAOS8J4nACpKl14r1GApQH/ne8dZRXkmH/HwytfEBzQXsSeLJvN/x4CGkUwCQCWympndU8z11fgvpAIA9Bm93TU7qQ8WDHx01A7DeHWWP75M9Ffv8HJsnANCCTNfWOaSElHeImAlY0V8ofREiIT1J5o/Hx3o58OVZkPPavsyE1POzTATcW1aLanQZgO1AnqZ7CqDvo1L/s559gakyORLQt6y99xWIvU3vUxXzAHykYqU0eh4TAv2Hy7uE1Jxg50iArfIiy1KjdVTVi9DnX/9cGBzoW1bq1RSpdzfz1heWEwHv8z7/2PkTAAD//70iOfs2jkD5AAAAAElFTkSuQmCC"
							alt="qr-code"
							width={243}
							height={248}
						/>
						<div className="mb-6 flex flex-col items-center justify-center">
							<p className="text-m-regular">Please scan to order,</p>
							<p className="text-m-regular">Thank you</p>
						</div>
					</div>
					<div className="border-b border-neutral-40" />
					<p className="my-5 text-center text-m-semibold">
						Powered by Posy Resto
					</p>
				</section>
			</article>
		</section>
	);
};

export default OrganismsContentsTransaction;
