import {PaymentMethod} from '@/domain/payment/models';
import {formatCurrency} from '@/view/common/utils/UtilsCurrencyFormater';
import {ColumnsType} from 'antd/es/table';
import React from 'react';

import MoleculesSwitchStatusPaymentMethod from '../../molecules/switch/payment';
import {TypePayment} from '../payment-options';

const GenerateTitleColumn = (type: TypePayment) => {
	const TitleColumn = {
		pos: 'Show at POS',
		'digital-menu': 'Show at Digital Menu',
	};

	return TitleColumn[type];
};

const GenerateKeyIndexColumn = (type: TypePayment) => {
	const KeyIndex = {
		pos: 'show_for_pos',
		'digital-menu': 'show_for_dm',
	};

	return KeyIndex[type];
};

const PaymentOptionsColumns = (type: TypePayment) => {
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
			render: (data, item) => {
				const showData =
					item.charge_fee_unit === 'percent'
						? `${data} %`
						: `${formatCurrency(data)}`;
				return <p>{showData}</p>;
			},
		},
		{
			title: 'Settlement Date',
			key: 'settlement_info',
			dataIndex: 'settlement_info',
		},
		{
			title: GenerateTitleColumn(type),
			key: GenerateKeyIndexColumn(type),
			dataIndex: GenerateKeyIndexColumn(type),
			render: (data, item) => {
				return (
					<MoleculesSwitchStatusPaymentMethod
						type={type}
						data={data}
						item={item}
					/>
				);
			},
		},
	];

	return columns;
};

export default PaymentOptionsColumns;
