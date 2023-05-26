import {Report} from '@/domain/report/model';
import {toRupiah} from '@/view/common/utils/common';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {
	generateStatusTransaction,
	generateTypeOfOrder,
} from '@/view/history/components/organisms/table/Columns';
import {ColumnsType} from 'antd/es/table';
import {BiFilter} from 'react-icons/bi';

type ColumnsProps = {
	onClickFilter: () => void;
	selectedColumns: DefaultColumns;
};

type Col =
	| keyof Pick<
			Report,
			| 'transaction_code'
			| 'restaurant_outlet_name'
			| 'created_at'
			| 'paid_at'
			| 'cashier_by'
			| 'served_by'
			| 'transaction_category'
			| 'total_price_final'
			| 'status'
			| 'payment_method_name'
			| 'total_order_qty'
	  >
	| 'order_time'
	| 'action';

type DefaultColumns = Array<{key: Col; name: string}>;

export const defaultColumns: DefaultColumns = [
	{
		key: 'transaction_code',
		name: 'Transaction code',
	},
	{
		key: 'restaurant_outlet_name',
		name: 'Outlet name',
	},
	{
		key: 'created_at',
		name: 'Transaction start',
	},
	{
		key: 'paid_at',
		name: 'Transaction close',
	},
	{
		key: 'order_time',
		name: 'Order time',
	},
	{
		key: 'cashier_by',
		name: 'Cashier',
	},
	{
		key: 'served_by',
		name: 'Waiter',
	},
	{
		key: 'transaction_category',
		name: 'Type of order',
	},
	{
		key: 'payment_method_name',
		name: 'Payment method',
	},
	{
		key: 'total_order_qty',
		name: 'Total item sold',
	},
	{
		key: 'total_price_final',
		name: 'Sales',
	},
	{
		key: 'status',
		name: 'Status',
	},

	{
		key: 'action',
		name: 'Action',
	},
];

const defCol = ({
	onClickFilter,
}: {
	onClickFilter: () => void;
}): ColumnsType<Partial<Report>> => [
	{
		title: 'Transaction ID',
		dataIndex: 'transaction_code',
		key: 'transaction_code',
		width: 215,
		render: text => <p className="text-m-semibold">{text}</p>,
	},
	{
		title: 'Outlet',
		dataIndex: 'restaurant_outlet_name',
		key: 'restaurant_outlet_name',
		width: 150,
		render: text => <p className="text-m-regular break-words">{text}</p>,
	},
	{
		title: 'Transaction start',
		dataIndex: 'created_at',
		key: 'created_at',
		width: 150,
		render: (_, record) => (
			<p className="whitespace-nowrap text-m-regular">
				{dateFormatter(record.created_at || 0, 'dd/MM/yyyy, HH:mm')}
			</p>
		),
	},
	{
		title: 'Transaction close',
		dataIndex: 'paid_at',
		key: 'paid_at',
		width: 170,
		render: (_, record) => (
			<p className="whitespace-nowrap text-m-regular">
				{dateFormatter(record.paid_at || 0, 'dd/MM/yyyy, HH:mm')}
			</p>
		),
	},
	{
		title: 'Order time',
		dataIndex: 'time_spent',
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
		title: 'Type of order',
		dataIndex: 'transaction_category',
		key: 'transaction_category',
		width: 150,
		render: text => (
			<p className="whitespace-nowrap text-m-medium">
				{generateTypeOfOrder(text)}
			</p>
		),
	},
	{
		title: 'Payment method',
		dataIndex: 'payment_method_name',
		key: 'payment_method_name',
		width: 150,
		render: text => (
			<p className="whitespace-nowrap text-m-regular">{text || '-'}</p>
		),
	},
	{
		title: 'Total item sold',
		dataIndex: 'total_order_qty',
		key: 'total_order_qty',
		width: 150,
		render: text => <p className="whitespace-nowrap text-m-regular">{text}</p>,
	},
	{
		title: 'Sales (Rp)',
		dataIndex: 'total_price_final',
		key: 'total_price_final',
		width: 200,
		render: text => (
			<p className="whitespace-nowrap text-m-regular">{toRupiah(text)}</p>
		),
	},
	{
		title: 'Status',
		dataIndex: 'status',
		width: 150,
		key: 'status',
		render: text => (
			<p className="whitespace-nowrap text-m-medium">
				{generateStatusTransaction(text)}
			</p>
		),
	},
	{
		title: (
			<BiFilter
				size={24}
				className="text-neutral-90 cursor-pointer hover:opacity-70 duration-300"
				onClick={onClickFilter}
			/>
		),
		key: 'action',
		width: 50,
		align: 'center',
		render: () => <p className="whitespace-nowrap text-m-regular"></p>,
	},
];

export const columns = ({
	onClickFilter,
	selectedColumns,
}: ColumnsProps): ColumnsType<Partial<Report>> => {
	const selected = selectedColumns.flatMap(col => col.key);

	return defCol({onClickFilter}).filter(col =>
		selected.includes(col.key as Col),
	);
};
