import {PaymentMethod} from '@/domain/payment/models';
import {GetFilterPaymentMethod} from '@/domain/payment/repositories/PaymentRepositories';
import MoleculesSwitchStatusPaymentMethod from '@/view/payment-setting/components/molecules/switch/payment';
import {useGetPaymentMethodViewModal} from '@/view/payment-setting/view-models/GetPaymentMethodViewModel';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import React from 'react';

const PaymentOptionForm = () => {
	const hooksParams: GetFilterPaymentMethod = {
		search: [
			{
				field: 'with_payment_method',
				value: 'true',
			},
			{field: 'is_integration', value: 'true'},
			{field: 'is_show', value: 'true'},
		],
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 10,
	};

	const {data: dataPayment, isLoading} =
		useGetPaymentMethodViewModal(hooksParams);

	const columns: ColumnsType<PaymentMethod> = [
		{
			title: 'Payment Method',
			key: 'name',
			dataIndex: 'name',
		},
		{
			title: 'MDR',
			key: 'charge_fee',
			dataIndex: 'charge_fee',
		},
		{
			title: 'Settlement Date',
			key: 'settlement_info',
			dataIndex: 'settlement_info',
		},
		{
			title: 'Show at Digital Menu',
			key: 'is_show',
			dataIndex: 'is_show',
			render: (data, item) => {
				return <MoleculesSwitchStatusPaymentMethod item={item} data={data} />;
			},
		},
	];

	return (
		<div className="pt-5">
			<h1 className="mb-4 text-l-bold">Payment Option</h1>
			<Table
				loading={isLoading}
				columns={columns}
				dataSource={dataPayment}
				pagination={false}
			/>
		</div>
	);
};

export default PaymentOptionForm;
