import CountUpTimer from '@/atoms/countup';
import {listOrderTabs} from '@/constants/order';
import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {Orders} from '@/domain/order/model';
import {CreateCancelOrderInput} from '@/domain/order/repositories/CreateCancelOrderRepository';
import {Transaction} from '@/domain/transaction/model';
import useDisclosure from '@/hooks/useDisclosure';
import {useAppSelector} from '@/store/hooks';
import {useCreateServeOrderViewModel} from '@/view/order/view-models/CreateServeOrderViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {cva} from 'class-variance-authority';
import {Button, Checkbox, Loading, Tabs} from 'posy-fnb-core';
import React from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {CgTrash} from 'react-icons/cg';

import CancelOrderModal from '../modal/CancelOrderModal';
import PaymentSummary from '../payment-summary';

export const OrderStatusStyle = cva('lowercase first-letter:uppercase', {
	variants: {
		variant: {
			ORDER_RECEIVED: 'text-blue-success',
			ORDER_PROCESS: 'text-yellow-500',
			ORDER_SERVED: 'text-green-success',
			ORDER_CANCELLED: 'text-red-caution',
		},
	},
	defaultVariants: {
		variant: 'ORDER_RECEIVED',
	},
});

type OrderDetailsProps = {
	dataTransaction: Transaction | undefined;
	dataOrder: Orders | undefined;
	loadOrder: boolean;
	tabValueOrder: number;
	setTabValueOrder: (value: number) => void;
	openCreateOrder: () => void;
	showDeleteOrder: boolean;
	toggleShowDeleteOrder: () => void;
};

const OrderDetails = ({
	tabValueOrder,
	setTabValueOrder,
	dataTransaction,
	openCreateOrder,
	showDeleteOrder,
	toggleShowDeleteOrder,
	dataOrder,
	loadOrder,
}: OrderDetailsProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

	const [
		isOpenCancelOrder,
		{open: openCancelOrder, close: closeCancelOrder},
		{setValueState, valueState},
	] = useDisclosure<
		Pick<
			CreateCancelOrderInput,
			'is_all' | 'order_detail_uuid' | 'order_uuid'
		> & {product_name: string}
	>({initialState: false});

	const {createServeOrder} = useCreateServeOrderViewModel({
		onSuccess: data => {
			if (data.message === 'OK') {
				queryClient.invalidateQueries([GetOrdersQueryKey]);
			}
		},
	});

	const handleChangeServeOrder = (
		order_uuid: string,
		order_detail_uuid: string,
		restaurant_outlet_uuid: string,
	) => {
		createServeOrder({
			order_uuid,
			order_detail_uuid,
			restaurant_outlet_uuid,
		});
	};

	const onOpenCancelOrder = (
		is_all: boolean,
		order_uuid: string,
		order_detail_uuid: string,
		product_name: string,
	) => {
		setValueState({
			is_all,
			order_uuid,
			order_detail_uuid,
			product_name,
		});
		openCancelOrder();
	};

	return (
		<section>
			<aside className="mt-6">
				<div className="flex items-center justify-between">
					<p className="text-xxl-bold">Order details</p>
					<CgTrash
						size={20}
						className="cursor-pointer text-neutral-70"
						onClick={toggleShowDeleteOrder}
					/>
				</div>

				<div className="w-full">
					<Tabs
						items={listOrderTabs}
						value={tabValueOrder}
						onChange={e => setTabValueOrder(e)}
						fullWidth
					/>
				</div>

				{loadOrder && (
					<div className="mt-20 flex w-full items-center justify-center">
						<Loading size={60} />
					</div>
				)}

				{tabValueOrder === 0 && !loadOrder && (
					<div className="pb-10">
						{!showDeleteOrder && (
							<div className="my-4 flex w-full items-center justify-center gap-1 rounded-lg border border-neutral-40 py-2 text-m-semibold">
								Order time:
								{dataTransaction && dataTransaction?.first_order_at > 0 ? (
									<CountUpTimer startTime={dataTransaction?.first_order_at} />
								) : (
									<div className="mx-0.5">-</div>
								)}
								<AiOutlineInfoCircle />
							</div>
						)}

						{!showDeleteOrder &&
							dataOrder &&
							dataOrder.map((order, idx) => (
								<div key={order.uuid} className="my-4 w-full">
									<div className="flex items-center justify-between text-m-semibold">
										<p>{`Order ${idx + 1}`}</p>
										<p
											className={OrderStatusStyle({
												variant: order.status,
											})}
										>
											{order.status.split('_')[1]}
										</p>
									</div>
									<div className="mt-2 w-full">
										{order?.order_detail?.map(orderDetail => (
											<Checkbox
												key={orderDetail.uuid}
												title={orderDetail.product_name}
												onChange={() =>
													handleChangeServeOrder(
														order.uuid,
														orderDetail.uuid,
														outletId,
													)
												}
												size="m"
												disabled={orderDetail.status !== 'PROCESS'}
												checked={orderDetail.status === 'SERVED'}
											/>
										))}
									</div>
								</div>
							))}

						{showDeleteOrder &&
							dataOrder &&
							dataOrder.map((order, idx) => (
								<div key={order.uuid} className="my-4 w-full">
									<div className="flex items-center justify-between text-m-semibold">
										<p>{`Order ${idx + 1}`}</p>
										<div
											className="cursor-pointer text-red-accent duration-150"
											role="presentation"
											onClick={() =>
												onOpenCancelOrder(true, order.uuid, '', '')
											}
										>
											Cancel Order
										</div>
									</div>
									<div className="mt-2 w-full">
										{order.order_detail?.map(orderDetail => (
											<div
												key={orderDetail.uuid}
												className="my-2 flex items-center justify-between"
											>
												<p className="text-m-regular">
													{orderDetail.product_name}
												</p>
												<p
													role="presentation"
													onClick={() =>
														onOpenCancelOrder(
															false,
															order.uuid,
															orderDetail.uuid,
															orderDetail.product_name,
														)
													}
													className="cursor-pointer text-s-semibold text-red-caution hover:text-opacity-75"
												>
													Cancel
												</p>
											</div>
										))}
									</div>
								</div>
							))}

						{!showDeleteOrder && (
							<Button
								variant="secondary"
								fullWidth
								size="l"
								className="my-2 mb-28"
								onClick={openCreateOrder}
							>
								Add New Order
							</Button>
						)}
					</div>
				)}

				{tabValueOrder === 1 &&
					!showDeleteOrder &&
					dataOrder &&
					dataTransaction && (
						<PaymentSummary
							dataOrder={dataOrder}
							transaction_uuid={dataTransaction?.uuid}
						/>
					)}
			</aside>

			{isOpenCancelOrder && (
				<CancelOrderModal
					isOpen={isOpenCancelOrder}
					close={closeCancelOrder}
					value={valueState}
				/>
			)}
		</section>
	);
};

export default OrderDetails;
