import {PaymentReportList} from '@/domain/payment/models/payment-report';
import {formatCurrency} from '@/view/common/utils/UtilsCurrencyFormater';
import {ColumnsType} from 'antd/es/table';
import {format, parseISO} from 'date-fns';

type PaymentReportColumntProps = {
	setSelectedPaymentReport: React.Dispatch<
		React.SetStateAction<PaymentReportList | undefined>
	>;
	handleOpenModal: () => void;
};

export const Category: Record<string, string> = {
	TRANSACTION: 'Payment',
	WITHDRAWAL: 'Withdraw',
};

export const ColorAmmount: Record<string, string> = {
	TRANSACTION: 'text-green-success',
	WITHDRAWAL: 'text-red-accent',
};

export const SettlementStatus: Record<string, {text: string; color: string}> = {
	SETTLED: {text: 'Success', color: 'text-green-success'},
	PENDING: {text: 'Pending', color: 'text-yellow-warning'},
};

const PaymentReportColumn = ({
	setSelectedPaymentReport,
	handleOpenModal,
}: PaymentReportColumntProps): ColumnsType<PaymentReportList> => {
	return [
		{
			title: 'No',
			render(value, record, index) {
				return <p>{index + 1}</p>;
			},
		},
		{
			title: 'Transaction ID',
			key: 'transaction_id',
			dataIndex: 'transaction_id',
			width: 120,
		},
		{
			title: 'Date',
			key: 'date',
			dataIndex: 'date',
			width: 130,
			render(value) {
				const date = parseISO(value);
				const formattedDate = format(date, 'dd MMM, hh:mm');

				return <p className="">{formattedDate}</p>;
			},
		},
		{
			title: 'Outlet',
			key: 'outlet',
			width: 200,
			dataIndex: 'outlet',
		},
		{
			title: 'Category',
			key: 'category',
			dataIndex: 'category',
			width: 150,
			render(value) {
				return <p>{Category[value]}</p>;
			},
		},
		{
			title: 'Payment Method',
			key: 'payment_method',
			dataIndex: 'payment_method',
			width: 150,
		},
		{
			title: 'Amount Received',
			key: 'ammount_received',
			dataIndex: 'ammount_received',
			width: 150,
			render(value, record) {
				const formatValue = formatCurrency(value);
				return <p className={ColorAmmount[record.category]}>{formatValue}</p>;
			},
		},
		{
			title: 'Settlement Status',
			key: 'setlement_status',
			dataIndex: 'setlement_status',
			width: 200,
			render(value) {
				return (
					<p className={SettlementStatus[value].color}>
						{SettlementStatus[value].text}
					</p>
				);
			},
		},
		{
			title: 'Action',
			dataIndex: 'settlemenet_status',
			render(_, record) {
				return (
					<a
						onClick={() => {
							handleOpenModal();
							setSelectedPaymentReport(record);
						}}
					>
						View Detail
					</a>
				);
			},
		},
	];
};

export default PaymentReportColumn;
