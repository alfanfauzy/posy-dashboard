import {useGetPaymentMethodViewModel} from '@/view/payment-setting/view-models/GetPaymentMethodViewModel';
import {Table} from 'antd';
import React from 'react';

import {TypePayment} from '../payment-options';
import {queryParams} from '../payment/utils/generateSearchParams';
import PaymentOptionsColumns from './columns';

type PaymentOptionsTable = {
	type: TypePayment;
};

const PaymentOptionsTable = ({type}: PaymentOptionsTable) => {
	const {data: dataPayment, isLoading} = useGetPaymentMethodViewModel(
		queryParams(type),
	);

	return (
		<Table
			loading={isLoading}
			columns={PaymentOptionsColumns(type)}
			dataSource={dataPayment}
			pagination={false}
		/>
	);
};

export default PaymentOptionsTable;
