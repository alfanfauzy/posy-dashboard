import {Orders} from '@/domain/order/model';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	TransactionTabsType,
	onChangeTransactionTab,
} from '@/view/common/store/slices/transaction';
import {listTransactionTabs} from '@/view/transaction/constants/order';
import {Button} from 'posy-fnb-core';
import React from 'react';

import TabOrderDetails from '../../molecules/tabs/order/details';
import TabPaymentDetails from '../../molecules/tabs/payment/payment-tab-bottom/details';

type OrderDetailsProps = {
	dataOrder: Orders | undefined;
};

const TransactionDetails = ({dataOrder}: OrderDetailsProps) => {
	const dispatch = useAppDispatch();

	const {transactionTab} = useAppSelector(state => state.transaction);

	const handleChangeTab = (tab: TransactionTabsType) =>
		dispatch(onChangeTransactionTab(tab));

	const generateDetailTabs = (tab: TransactionTabsType) => {
		const tabs = {
			order: <TabOrderDetails dataOrder={dataOrder} />,
			payment: <TabPaymentDetails dataOrder={dataOrder} />,
		};

		return tabs[tab];
	};

	return (
		<section className="h-full">
			<aside className="h-full">
				<div className="w-full h-fit flex bg-slate-100 rounded-full border border-neutral-50">
					{listTransactionTabs.map(tab =>
						transactionTab === tab.value ? (
							<Button
								size="m"
								key={tab.value}
								className="w-1/2 text-m-bold"
								onClick={() => handleChangeTab(tab.value)}
							>
								{tab.label}
							</Button>
						) : (
							<p
								key={tab.value}
								onClick={() => {
									handleChangeTab(tab.value);
								}}
								className="w-1/2 flex items-center justify-center text-m-bold cursor-pointer hover:opacity-70 duration-300 ease-in-out"
							>
								{tab.label}
							</p>
						),
					)}
				</div>

				{generateDetailTabs(transactionTab)}
			</aside>
		</section>
	);
};

export default TransactionDetails;
