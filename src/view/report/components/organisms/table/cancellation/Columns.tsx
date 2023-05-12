import {CancellationReport} from '@/domain/report-cancellation/model';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {ColumnsType} from 'antd/es/table';

export const Columns: ColumnsType<CancellationReport> = [
	{
		title: 'Transaction ID',
		dataIndex: 'transaction_code',
		key: 'transaction_code',
		width: 215,
		render: text => <p className="text-m-semibold">{text}</p>,
	},
	{
		title: 'Outlet',
		dataIndex: 'outlet_name',
		key: 'outlet_name',
		width: 150,
		render: text => <p className="text-m-regular break-words">{text}</p>,
	},
	{
		title: 'Transaction start',
		dataIndex: 'transaction_start',
		key: 'transaction_start',
		width: 150,
		render: value => {
			const newDate = new Date(value);
			return (
				<p className="whitespace-nowrap text-m-regular">
					{dateFormatter(newDate || 0, 'dd/MM/yyyy, HH:mm')}
				</p>
			);
		},
	},
	{
		title: 'Transaction close',
		dataIndex: 'transaction_close',
		key: 'transaction_close',
		width: 170,
		render: value => {
			const newDate = new Date(value);
			return (
				<p className="whitespace-nowrap text-m-regular">
					{dateFormatter(newDate || 0, 'dd/MM/yyyy, HH:mm')}
				</p>
			);
		},
	},
	{
		title: 'Order time',
		dataIndex: 'order_time',
		width: 120,
		key: 'order_time',
		render: text => (
			<p className="whitespace-nowrap text-m-regular">{`${text % 60} min`}</p>
		),
	},
	{
		title: 'Cashier',
		dataIndex: 'cashier_by',
		key: 'cashier_by',
		width: 150,
		render: text => (
			<p className="whitespace-nowrap text-m-regular">{text || '-'}</p>
		),
	},
	{
		title: 'Waiter',
		dataIndex: 'served_by',
		key: 'served_by',
		width: 150,
		render: text => (
			<p className="whitespace-nowrap text-m-regular">{text || '-'}</p>
		),
	},
	{
		title: 'Cancel Reason',
		dataIndex: 'cancel_reason',
		key: 'cancel_reason',
		width: 150,
		render: text => <p className="whitespace-nowrap text-m-regular">{text}</p>,
	},
];
