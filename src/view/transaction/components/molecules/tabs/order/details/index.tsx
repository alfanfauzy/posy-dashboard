import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {OrderDetailStatus, OrderStatus, Orders} from '@/domain/order/model';
import {ServeOrder} from '@/domain/order/repositories/CreateServeOrderRepository';
import {Can} from '@/view/auth/components/organisms/rbac';
import PlusCircleIcon from '@/view/common/assets/icons/plusCircle';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeIsOpenCreateOrder,
	onChangeIsOpenPrintToKitchen,
} from '@/view/common/store/slices/order';
import {generateStatusOrder} from '@/view/common/utils/UtilsGenerateOrderStatus';
import {useCreateServeOrderViewModel} from '@/view/order/view-models/CreateServeOrderViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Button, Checkbox} from 'posy-fnb-core';
import React from 'react';

type TabOrderDetailsProps = {
	dataOrder: Orders | undefined;
};

const TabOrderDetails = ({dataOrder}: TabOrderDetailsProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

	const openCreateOrder = () => dispatch(onChangeIsOpenCreateOrder(true));

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

	const handlePrintToKitchen = (status: OrderStatus) => {
		status === OrderStatus.ORDER_NEED_TO_PRINT
			? dispatch(onChangeIsOpenPrintToKitchen(true))
			: () => undefined;
	};

	return (
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
							<div onClick={() => handlePrintToKitchen(order.status)}>
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
										checked={orderDetail.status === OrderDetailStatus.SERVED}
									/>
								) : (
									<div key={orderDetail.uuid} className="text-m-regular my-1">
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
	);
};

export default TabOrderDetails;
