import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {OrderDetailStatus, OrderStatus, Orders} from '@/domain/order/model';
import {ServeOrder} from '@/domain/order/repositories/CreateServeOrderRepository';
import {Transaction} from '@/domain/transaction/model';
import {Can} from '@/view/auth/components/organisms/rbac';
import NoOrderIcon from '@/view/common/assets/icons/noOrder';
import PlusCircleIcon from '@/view/common/assets/icons/plusCircle';
import {listOrderTabs} from '@/view/common/constants/order';
import {useAppSelector} from '@/view/common/store/hooks';
import {generateStatusOrder} from '@/view/common/utils/UtilsGenerateOrderStatus';
import {useCreateServeOrderViewModel} from '@/view/order/view-models/CreateServeOrderViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Button, Checkbox, Loading} from 'posy-fnb-core';
import React from 'react';

import PaymentSummary from '../payment-summary';

type OrderDetailsProps = {
	dataTransaction: Transaction | undefined;
	dataOrder: Orders | undefined;
	loadOrder: boolean;
	tabValueOrder: number;
	setTabValueOrder: (value: number) => void;
	openCreateOrder: () => void;
	openPrintToKitchen: () => void;
};

const OrderDetails = ({
	tabValueOrder,
	setTabValueOrder,
	dataTransaction,
	openCreateOrder,
	dataOrder,
	loadOrder,
	openPrintToKitchen,
}: OrderDetailsProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

	const {createServeOrder} = useCreateServeOrderViewModel({
		onSuccess: _data => {
			const data = _data as ServeOrder;
			if (data) {
				queryClient.invalidateQueries([GetOrdersQueryKey]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				queryClient.invalidateQueries([GetTransactionsQueryKey]);
			}
		},
	});

	const handleChangeServeOrder = (
		order_uuid: string,
		order_detail_uuid: string,
		restaurant_outlet_uuid: string,
		status: OrderDetailStatus,
	) => {
		createServeOrder({
			order_uuid,
			order_detail_uuid,
			restaurant_outlet_uuid,
			rollback_to_kitchen: status === OrderDetailStatus.SERVED,
		});
	};

	return (
		<section className="h-full">
			<aside className="h-full">
				<div className="w-full h-fit flex bg-slate-100 rounded-full border border-neutral-50">
					{listOrderTabs.map(tab =>
						tabValueOrder === tab.value ? (
							<Button
								size="m"
								key={tab.value}
								className="w-1/2 text-m-bold"
								onClick={() => setTabValueOrder(tabValueOrder)}
							>
								{tab.label}
							</Button>
						) : (
							<p
								key={tab.value}
								onClick={() => {
									setTabValueOrder(tab.value);
								}}
								className="w-1/2 flex items-center justify-center text-m-bold cursor-pointer hover:opacity-70 duration-300 ease-in-out"
							>
								{tab.label}
							</p>
						),
					)}
				</div>

				{loadOrder && (
					<div className="flex w-full h-3/5 items-center justify-center">
						<Loading size={60} />
					</div>
				)}

				{tabValueOrder === 0 && !loadOrder && (
					<div className="pb-10 h-3/4 overflow-auto">
						{!dataOrder && (
							<div className="my-4 bg-neutral-20 h-[85%] flex items-center justify-center">
								<div
									onClick={openCreateOrder}
									className="flex flex-col items-center gap-3"
								>
									<Can I="create" an="order">
										<PlusCircleIcon
											width={70}
											height={70}
											className="cursor-pointer transition-all duration-300 ease-in-out hover:opacity-60"
										/>
										<p className="cursor-pointer text-l-medium text-neutral-60 transition-all duration-300 ease-in-out hover:opacity-60">
											Create new Order
										</p>
									</Can>
								</div>
							</div>
						)}

						{dataOrder &&
							dataOrder.map(order => (
								<div
									key={order.uuid}
									className="my-4 p-4 border border-neutral-40 rounded-lg w-full"
								>
									<div className="flex items-center justify-between text-m-semibold pb-2 mb-2.5 border-b border-neutral-30">
										<p>{`Order ${order.order_number}`}</p>
										<div
											onClick={
												order.status === OrderStatus.ORDER_NEED_TO_PRINT
													? openPrintToKitchen
													: () => undefined
											}
										>
											{generateStatusOrder(order.status)}
										</div>
									</div>
									<div className="mt-2 w-full">
										{order?.order_detail?.map(orderDetail =>
											orderDetail.status !== OrderDetailStatus.NEED_TO_PRINT ? (
												<Checkbox
													key={orderDetail.uuid}
													title={`${orderDetail.product_name} x${orderDetail.qty}`}
													onChange={() =>
														handleChangeServeOrder(
															order.uuid,
															orderDetail.uuid,
															outletId,
															orderDetail.status,
														)
													}
													size="m"
													checked={
														orderDetail.status === OrderDetailStatus.SERVED
													}
												/>
											) : (
												<div
													key={orderDetail.uuid}
													className="text-m-regular my-1"
												>
													{orderDetail.product_name} x{orderDetail.qty}
												</div>
											),
										)}
									</div>
								</div>
							))}

						{dataOrder && dataOrder?.length > 0 && (
							<Can I="create" an="order">
								<Button
									variant="secondary"
									fullWidth
									size="m"
									className="mt-2 mb-10"
									onClick={openCreateOrder}
								>
									Add New Order
								</Button>
							</Can>
						)}
					</div>
				)}

				{tabValueOrder === 1 && dataTransaction && (
					<div className="pb-10 h-3/4 overflow-auto">
						{!dataOrder && (
							<div className="my-4 bg-neutral-20 h-[85%] flex items-center justify-center">
								<div className="flex w-full flex-col items-center justify-center gap-4">
									<NoOrderIcon width={125} height={55} />
									<p className="text-m-medium">There’s no payment yet</p>
								</div>
							</div>
						)}

						{dataOrder && (
							<PaymentSummary
								dataOrder={dataOrder}
								transaction_uuid={dataTransaction?.uuid}
							/>
						)}
					</div>
				)}
			</aside>
		</section>
	);
};

export default OrderDetails;
