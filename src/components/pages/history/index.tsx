import InputSearch from '@/atoms/input/search';
import Table from '@/atoms/table';
import {Transaction, TransactionStatus} from '@/domain/transaction/model';
import useDisclosure from '@/hooks/useDisclosure';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {openModal} from '@/store/slices/modal';
import {toRupiah} from '@/utils/common';
import {defineds} from '@/utils/date';
import {dateFormatter, toUnix} from '@/utils/dateFormatter';
import {onChangeQueryParams} from '@/utils/UtilsChangeQueryParams';
import {useGetTransactionsViewModel} from '@/view/transaction/view-models/GetTransactionsViewModel';
import type {ColumnsType} from 'antd/es/table';
import moment from 'moment';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

const Datepicker = dynamic(() => import('@/atoms/input/datepicker'), {
	loading: () => <div />,
});

export const generateStatus = (status: TransactionStatus) => {
	const statusColor = {
		WAITING_ORDER: 'text-blue-success',
		WAITING_PAYMENT: 'text-red-accent',
		WAITING_FOOD: 'text-yellow-500',
		PAID: 'text-green-success',
		CANCELLED: 'text-red-accent',
	};

	const statusText = {
		WAITING_ORDER: 'Waiting Order',
		WAITING_PAYMENT: 'Waiting Payment',
		WAITING_FOOD: 'Waiting Food',
		PAID: 'Paid',
		CANCELLED: 'Cancelled',
	};

	return <p className={`${statusColor[status]}`}>{statusText[status]}</p>;
};

type ColumnsProps = {
	handleOpenDetails: (record: Transaction) => void;
};

const columns = ({
	handleOpenDetails,
}: ColumnsProps): ColumnsType<Partial<Transaction>> => [
	{
		title: 'Trx ID',
		dataIndex: 'transaction_code',
		key: 'transaction_code',
		width: 215,
		render: text => <p className="text-m-semibold">{text}</p>,
	},
	{
		title: 'Date',
		dataIndex: 'created_at',
		key: 'date',
		render: (_, record) => (
			<p className="whitespace-nowrap text-m-regular">
				{dateFormatter(record.created_at || 0, 'dd MMM, HH:mm')}
			</p>
		),
	},
	{
		title: 'Staff',
		dataIndex: 'staff',
		key: 'staff',
		render: text => <p className="whitespace-nowrap text-m-regular">{text}</p>,
	},
	{
		title: <p className="whitespace-nowrap">Total order</p>,
		dataIndex: 'total_order',
		key: 'total_order',
		render: text => <p className="whitespace-nowrap text-m-regular">{text}</p>,
	},
	{
		title: <p className="whitespace-nowrap">Payment method</p>,
		dataIndex: 'payment_method',
		key: 'payment_method',
		width: 150,
		render: text => (
			// <p className="whitespace-nowrap text-m-regular">{text}</p>
			<p className="whitespace-nowrap text-m-regular">QRIS</p>
		),
	},
	{
		title: <p className="whitespace-nowrap">Total payment</p>,
		dataIndex: 'total_payment',
		key: 'total_payment',
		render: text => <p className="whitespace-nowrap text-m-regular">{text}</p>,
	},
	{
		align: 'center',
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: text => (
			<div className="whitespace-nowrap text-m-regular">
				{generateStatus(text)}
			</div>
		),
	},
	{
		title: ' ',
		key: 'action',
		align: 'center',
		render: (_, record) => (
			<div
				role="presentation"
				onClick={() => handleOpenDetails(record as any)}
				// href={`history/${record.transaction_code}`}
				className="cursor-pointer whitespace-nowrap text-s-regular transition-all duration-300 ease-in-out hover:text-neutral-100 hover:text-opacity-50"
			>
				View Details
			</div>
		),
	},
];

const PagesHistory = () => {
	const {query} = useRouter();
	const dispatch = useAppDispatch();
	const {outletId, isSubscription, isLoggedIn} = useAppSelector(
		state => state.auth,
	);

	const [isOpenFilterDate, {open: openFilterDate, close: closeFilterDate}] =
		useDisclosure({initialState: false});

	const [date, setDate] = useState([
		{
			startDate: defineds.startOfDay,
			endDate: defineds.endOfDay,
			key: 'selection',
		},
	]);

	const {
		data,
		isLoading: loadDataHistory,
		pagination,
	} = useGetTransactionsViewModel(
		{
			limit: Number(query.limit) || 10,
			page: Number(query.page) || 1,
			search: [
				{
					field: 'status',
					value: 'PAID|CANCELLED',
				},
				{
					field: 'keyword',
					value: (query.search as string) || '',
				},
				{
					field: 'created_at',
					value: `${toUnix(date[0].startDate)}&&${toUnix(date[0].endDate)}`,
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

	const handleOpenDetails = (record: Transaction) => {
		dispatch(
			openModal({
				overflow: true,
				className: 'w-3/4 overflow-auto',
				component: (
					<section className="px-4 pt-6 pb-4 text-primary-main">
						<aside className="flex items-center justify-between gap-4 border-b border-neutral-40 pb-4">
							<div className="flex-1">
								<p className="text-xxl-bold">{record.transaction_code}</p>
							</div>
							<div className="flex gap-5 text-xl-regular">
								<div className="border-r border-neutral-40 pr-5">
									<p>{record.customer_name}</p>
								</div>
								<div className="border-r border-neutral-40 pr-5">
									<p>{`Table ${record.table_number}`}</p>
								</div>
								<div>
									<p>{`Table ${record.total_pax}`}</p>
								</div>
							</div>
						</aside>
						<aside className="grid grid-cols-4 gap-6 border-b border-neutral-40 py-4">
							<div>
								<p className="text-l-bold">
									{moment(record.created_at).format('ll, hh:mm')}
								</p>
							</div>
							<div>
								<p>Staff</p>
								<p className="text-l-bold">{record.staff}</p>
							</div>
							<div>
								<p>Payment</p>
								<p className="text-l-bold">OVO</p>
							</div>
							<div className="flex flex-col items-end">
								<p>Status</p>
								<p className="text-l-bold">{generateStatus(record.status)}</p>
							</div>
						</aside>
						<aside className="border-b border-neutral-40 py-4">
							<div>
								<div className="flex items-start justify-between">
									<div className="flex w-3/4 items-start break-words lg:w-1/2">
										<p className="mr-5 text-xl-semibold">20x</p>
										<p className="flex-1 text-l-regular">Fried Capcay</p>
									</div>
									<div className="flex flex-col items-end">
										<p className="text-l-regular">{toRupiah(200000)}</p>
									</div>
								</div>
								<div id="addon" className="mt-2 ml-12 flex flex-col gap-1">
									<div className="flex items-start justify-between">
										<p className="w-3/4 text-l-regular line-clamp-2">
											Spicy Level 0
										</p>
										<p className="text-l-regular text-neutral-60">
											{toRupiah(200000)}
										</p>
									</div>
									{/* {item.addOnVariant.map((addon) => (
                  <div
                    key={addon.variant_uuid}
                    className="flex items-start justify-between"
                  >
                    <p className="w-3/4 text-s-regular text-neutral-90 line-clamp-1">{`${addon.addOnName} ${addon.variant_name}`}</p>
                  </div>
                ))} */}
								</div>
							</div>
							<div className="mt-4">
								<div className="flex items-start justify-between">
									<div className="flex w-1/2 items-start break-words">
										<p className="mr-5 text-xl-semibold">20x</p>
										<p className="flex-1 text-l-regular line-clamp-3">
											Special Fried Capcay by Chef Ahmed with Extra Spicy
										</p>
									</div>
									<div className="flex flex-col items-end">
										<p className="text-l-regular">{toRupiah(200000)}</p>
									</div>
								</div>
								<div id="addon" className="mt-2 ml-12 flex flex-col gap-1">
									<div className="flex items-start justify-between">
										<p className="w-3/4 text-l-regular line-clamp-2">
											Extra Capcay
										</p>
										<p className="text-l-regular text-neutral-60">
											{toRupiah(200000)}
										</p>
									</div>
								</div>
							</div>
							<div className="mt-4">
								<div className="flex items-start justify-between">
									<div className="flex w-1/2 items-start break-words">
										<p className="mr-5 text-xl-semibold">20x</p>
										<p className="flex-1 text-l-regular line-clamp-3">
											Special Fried Capcay by Chef Ahmed with Extra Spicy
										</p>
									</div>
									<div className="flex flex-col items-end">
										<p className="text-l-regular">{toRupiah(200000)}</p>
									</div>
								</div>
								<div id="addon" className="mt-2 ml-12 flex flex-col gap-1">
									<div className="flex items-start justify-between">
										<p className="w-3/4 text-l-regular line-clamp-2">
											Extra Capcay
										</p>
										<p className="text-l-regular text-neutral-60">
											{toRupiah(200000)}
										</p>
									</div>
								</div>
							</div>
						</aside>

						<aside className="flex flex-col gap-2 pt-4">
							<div className="flex items-center justify-between text-m-medium">
								<p>Subtotal</p>
								<p>{toRupiah(210000)}</p>
							</div>
							<div className="flex items-center justify-between text-m-medium">
								<p>Discount</p>
								<p>{toRupiah(0)}</p>
							</div>
							<div className="flex items-center justify-between text-m-medium">
								<p>Service</p>
								<p>{toRupiah(0)}</p>
							</div>
							<div className="flex items-center justify-between text-m-medium">
								<p>Tax 10%</p>
								<p>{toRupiah(0)}</p>
							</div>
							<div className="flex items-center justify-between text-l-semibold">
								<p>Total</p>
								<p>{toRupiah(2000000)}</p>
							</div>
						</aside>
					</section>
				),
			}),
		);
	};

	return (
		<main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
			<article>
				<aside className="flex items-start">
					<p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
						History
					</p>
				</aside>
				<aside className="mt-6">
					<div className="mt-1 flex items-center space-x-4">
						<Datepicker
							dateProps={date}
							close={closeFilterDate}
							open={openFilterDate}
							isOpen={isOpenFilterDate}
							handleChange={(item: any) => setDate([item])}
						/>
						<div className="flex w-1/2 items-center lg:w-1/4">
							<InputSearch
								isOpen
								placeholder="Search Transaction"
								search={(query.search as string) || ''}
								onSearch={e => onChangeQueryParams('search', e.target.value)}
								onClearSearch={() => onChangeQueryParams('search', '')}
							/>
						</div>
					</div>
				</aside>
			</article>

			<article className="mt-6">
				<Table
					paginationData={pagination}
					columns={columns({handleOpenDetails})}
					dataSource={data}
					scroll={{y: '54vh', x: 1100}}
					loading={loadDataHistory}
				/>
			</article>
		</main>
	);
};

export default PagesHistory;
