import {
	CancelReason,
	Transaction,
	TransactionCategory,
	TransactionStatus,
} from '@/domain/transaction/model';
import {toRupiah} from '@/view/common/utils/common';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {ColumnsType} from 'antd/es/table';

export const generateStatusTransaction = (status: TransactionStatus) => {
	const statusColor = {
		WAITING_ORDER: 'text-blue-success',
		WAITING_PAYMENT: 'text-red-accent',
		WAITING_FOOD: 'text-warning-main',
		PAID: 'text-green-success',
		CANCELLED: 'text-red-accent',
		REFUND: 'text-warning-main',
	};

	const statusText = {
		WAITING_ORDER: 'Waiting Order',
		WAITING_PAYMENT: 'Waiting Payment',
		WAITING_FOOD: 'Waiting Food',
		PAID: 'Paid',
		CANCELLED: 'Cancelled',
		REFUND: 'Refund',
	};

	return <p className={`${statusColor[status]}`}>{statusText[status]}</p>;
};

export const generateTypeOfOrder = (typeOrder: TransactionCategory) => {
	const typeOfOrder = {
		DINE_IN: 'Dine In',
		TAKE_AWAY: 'Take Away',
	};

	return <p>{typeOfOrder[typeOrder] || '-'}</p>;
};

export const generateCancelReason = (cancelReason: CancelReason) => {
	const cancelReasonList = {
		OUT_OF_STOCK: 'Out of stock',
		CUSTOMER_CANCELLATION: 'Customer cancellation',
		LONG_WAITING: 'Long waiting time',
		WRONG_ORDER: 'Wrong order',
		OTHER: 'Others',
	};

	return <p>{cancelReasonList[cancelReason]}</p>;
};

type ColumnsProps = {
	handleOpenDetails: (record: Transaction) => void;
};

export const HistoryTablecolumns = ({
	handleOpenDetails,
}: ColumnsProps): ColumnsType<Partial<Transaction>> => [
	{
		title: 'Transaction ID',
		dataIndex: 'transaction_code',
		key: 'transaction_code',
		width: 215,
		render: text => <p className="text-m-semibold">{text}</p>,
	},
	{
		title: 'Date',
		dataIndex: 'paid_at',
		key: 'date',
		render: (_, record) => (
			<p className="whitespace-nowrap text-m-regular">
				{dateFormatter(record.paid_at || 0, 'dd MMM, HH:mm')}
			</p>
		),
	},
	{
		title: 'Staff',
		dataIndex: 'cashier_by',
		key: 'staff',
		render: text => (
			<p className="whitespace-nowrap text-m-regular">{text || '-'}</p>
		),
	},
	{
		title: <p className="whitespace-nowrap">Total order</p>,
		dataIndex: 'total_order',
		key: 'total_order',
		align: 'center',
		render: text => <p className="whitespace-nowrap text-m-regular">{text}</p>,
	},
	{
		title: <p className="whitespace-nowrap">Payment method</p>,
		dataIndex: 'payment_method_name',
		key: 'payment_method',
		width: 150,
		render: text => (
			<p className="whitespace-nowrap text-m-regular">{text || '-'}</p>
		),
	},
	{
		title: <p className="whitespace-nowrap">Total sales</p>,
		dataIndex: 'total_price_final',
		key: 'total_payment',
		render: text => (
			<p className="whitespace-nowrap text-m-regular">{toRupiah(text)}</p>
		),
	},
	{
		align: 'center',
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: text => (
			<div className="whitespace-nowrap text-m-regular">
				{generateStatusTransaction(text)}
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
				onClick={() => handleOpenDetails(record as Transaction)}
				className="cursor-pointer whitespace-nowrap text-s-regular transition-all duration-300 ease-in-out text-secondary-main hover:text-opacity-50"
			>
				View Details
			</div>
		),
	},
];
