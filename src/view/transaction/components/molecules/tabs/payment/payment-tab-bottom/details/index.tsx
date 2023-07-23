import {Orders} from '@/domain/order/model';
import PaymentSummary from '@/view/transaction/components/organisms/payment-summary';
import React from 'react';

import EmptyData from '../../../../empty-state/empty-data';

type TabPaymentDetailsProps = {
	dataOrder: Orders | undefined;
};

const TabPaymentDetails = ({dataOrder}: TabPaymentDetailsProps) => {
	return (
		<div className="pb-10 h-3/4 overflow-auto">
			{!dataOrder && (
				<EmptyData iconSize={150} message="There's no payment yet" />
			)}

			{dataOrder && <PaymentSummary dataOrder={dataOrder} />}
		</div>
	);
};

export default TabPaymentDetails;
