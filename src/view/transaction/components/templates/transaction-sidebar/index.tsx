import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {useGetOrdersViewModel} from '@/view/order/view-models/GetOrdersViewModel';
import {validationSchemaUpdateTransaction} from '@/view/transaction/schemas/update-transaction';
import {useGetTransactionViewModel} from '@/view/transaction/view-models/GetTransactionViewModel';
import dynamic from 'next/dynamic';
import {Loading} from 'posy-fnb-core';
import React from 'react';

import TransactionDetails from '../../organisms/transaction-details';
import TransactionDetailsHeader from '../../organisms/transaction-details/header';
import TransactionTabs from '../../organisms/transaction-tabs';

const ApplyDiscountModal = dynamic(
	() => import('../../organisms/modal/ApplyDiscountModal'),
	{
		loading: () => <div />,
	},
);

const CreatePaymentModal = dynamic(
	() => import('../../organisms/modal/CreatePaymentModal'),
	{
		loading: () => <div />,
	},
);

const PrintToKitchenModal = dynamic(
	() => import('../../organisms/modal/PrintToKitchenModal'),
	{
		loading: () => <div />,
	},
);

const ManualSubmitOrder = dynamic(() => import('../manual-order'), {
	loading: () => <div />,
});

const TransactionSidebar = () => {
	const {selectedTrxId} = useAppSelector(state => state.transaction);

	const methods = useForm({
		mode: 'onChange',
		schema: validationSchemaUpdateTransaction,
	});

	const {setValue, reset} = methods;

	const {data: dataTransaction, isLoading: loadTransaction} =
		useGetTransactionViewModel(
			{transaction_uuid: selectedTrxId},
			{
				enabled: !!selectedTrxId,
				onSuccess: data => {
					if (data.message === 'OK' && data.data.table_number) {
						setValue('customer_name', data?.data?.customer_name);
						if (data?.data?.total_pax > 0) {
							setValue('total_pax', data?.data?.total_pax.toString());
						}
						if (data?.data?.transaction_category) {
							setValue('transaction_category', {
								label:
									data?.data?.transaction_category === 'DINE_IN'
										? 'Dine in'
										: 'Take away',
								value: data?.data?.transaction_category === 'DINE_IN' ? 0 : 1,
							});
						}
					} else {
						reset({
							customer_name: '',
							total_pax: '',
							restaurant_outlet_table_uuid: '',
							transaction_category: {
								label: '',
								value: 0,
							},
						});
					}
				},
			},
		);

	const {data: dataOrder, isLoading: loadOrder} = useGetOrdersViewModel(
		{
			transaction_uuid: selectedTrxId || '',
		},
		{enabled: !!selectedTrxId},
	);

	return (
		<main className="relative lg:min-w-[350px] lg:max-w-[350px] min-w-[310px] max-w-[310px] h-full rounded-l-lg bg-neutral-10">
			{loadTransaction && (
				<div className="flex h-full w-full items-center justify-center">
					<Loading size={75} />
				</div>
			)}

			{dataTransaction && (
				<article className="flex h-full flex-col">
					<section className="h-full">
						<TransactionDetailsHeader
							dataTransaction={dataTransaction}
							dataOrder={dataOrder}
						/>

						{loadOrder && (
							<div className="flex w-full h-3/5 items-center justify-center">
								<Loading size={60} />
							</div>
						)}

						{!loadOrder && (
							<div className="h-full overflow-y-auto p-4">
								<TransactionDetails dataOrder={dataOrder} />
							</div>
						)}
					</section>
					<TransactionTabs dataOrder={dataOrder} />
				</article>
			)}

			<CreatePaymentModal />

			<ApplyDiscountModal />

			<ManualSubmitOrder dataTransaction={dataTransaction} />

			{dataOrder && <PrintToKitchenModal dataOrder={dataOrder} />}
		</main>
	);
};

export default TransactionSidebar;
