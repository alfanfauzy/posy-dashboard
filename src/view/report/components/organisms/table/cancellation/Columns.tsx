import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';

export const Columns = [
	{
		title: 'Transaction ID',
		dataIndex: 'transaction_code',
		key: 'transaction_code',
		width: 215,
		// render: text => <p className="text-m-semibold">{text}</p>,
	},
	{
		title: 'Outlet',
		dataIndex: 'restaurant_outlet_name',
		key: 'restaurant_outlet_name',
		width: 150,
		// render: text => <p className="text-m-regular break-words">{text}</p>,
	},
	{
		title: 'Transaction start',
		dataIndex: 'created_at',
		key: 'created_at',
		width: 150,
		// render: (_, record) => (
		// 	<p className="whitespace-nowrap text-m-regular">
		// 		{dateFormatter(record.created_at || 0, 'dd MMM, HH:mm')}
		// 	</p>
		// ),
	},
	{
		title: 'Transaction close',
		dataIndex: 'paid_at',
		key: 'paid_at',
		width: 170,
		// render: (_, record) => (
		// 	<p className="whitespace-nowrap text-m-regular">
		// 		{dateFormatter(record.paid_at || 0, 'dd MMM, HH:mm')}
		// 	</p>
		// ),
	},
	{
		title: 'Order time',
		dataIndex: 'time_spent',
		width: 120,
		key: 'order_time',
		// render: text => (
		// 	<p className="whitespace-nowrap text-m-regular">{`${text % 60} min`}</p>
		// ),
	},
	{
		title: 'Cashier',
		dataIndex: 'cashier_by',
		key: 'cashier_by',
		width: 150,
		// render: text => (
		// 	<p className="whitespace-nowrap text-m-regular">{text || '-'}</p>
		// ),
	},
	{
		title: 'Waiter',
		dataIndex: 'served_by',
		key: 'served_by',
		width: 150,
		// render: text => (
		// 	<p className="whitespace-nowrap text-m-regular">{text || '-'}</p>
		// ),
	},
	{
		title: 'Cancel Reason',
		dataIndex: 'transaction_category',
		key: 'transaction_category',
		width: 150,
		// render: text => (
		// 	<p className="whitespace-nowrap text-m-regular lowercase">
		// 		{text.split('_').join(' ') || '-'}
		// 	</p>
		// ),
	},
];
