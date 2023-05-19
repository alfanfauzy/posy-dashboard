/* eslint-disable @typescript-eslint/naming-convention */
import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {OrderDetailStatus, OrderStatus, Orders} from '@/domain/order/model';
// import {CreateCancelOrderInput} from '@/domain/order/repositories/CreateCancelOrderRepository';
import {ServeOrder} from '@/domain/order/repositories/CreateServeOrderRepository';
import {Transaction} from '@/domain/transaction/model';
import {Can} from '@/view/auth/components/organisms/rbac';
import NoOrderIcon from '@/view/common/assets/icons/noOrder';
import PlusCircleIcon from '@/view/common/assets/icons/plusCircle';
// import CountUpTimer from '@/view/common/components/atoms/countup';
import {listOrderTabs} from '@/view/common/constants/order';
// import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {useCreateServeOrderViewModel} from '@/view/order/view-models/CreateServeOrderViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Button, Checkbox, Loading} from 'posy-fnb-core';
import React from 'react';
import {AiFillPrinter, AiOutlineInfoCircle} from 'react-icons/ai';
import {BsCheckCircleFill} from 'react-icons/bs';
import {MdSoupKitchen} from 'react-icons/md';

// import CancelOrderModal from '../modal/CancelOrderModal';
import PaymentSummary from '../payment-summary';

export const generateStatusOrder = (status: OrderStatus) => {
	const statusColor = {
		0: 'text-blue-success',
		1: 'text-blue-success',
		2: 'text-warning-main',
		3: 'text-green-success',
		4: 'text-red-caution',
	};

	const statusText = {
		0: 'Not selected',
		1: 'Need to print',
		2: 'On kitchen',
		3: 'Served',
		4: 'Cancelled',
	};

	const icon = {
		0: <AiOutlineInfoCircle />,
		1: <AiFillPrinter />,
		2: <MdSoupKitchen />,
		3: <BsCheckCircleFill />,
		4: <AiOutlineInfoCircle />,
	};

	return (
		<p
			className={`flex gap-2 items-center text-m-medium ${statusColor[status]}`}
		>
			{icon[status]}
			{statusText[status]}
		</p>
	);
};

type OrderDetailsProps = {
	dataTransaction: Transaction | undefined;
	dataOrder: Orders | undefined;
	loadOrder: boolean;
	tabValueOrder: number;
	setTabValueOrder: (value: number) => void;
	openCreateOrder: () => void;
	// showDeleteOrder: boolean;
	// toggleShowDeleteOrder: () => void;
};

const OrderDetails = ({
	tabValueOrder,
	setTabValueOrder,
	dataTransaction,
	openCreateOrder,
	// showDeleteOrder,
	// toggleShowDeleteOrder,
	dataOrder,
	loadOrder,
}: OrderDetailsProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);

	// const [
	// 	isOpenCancelOrder,
	// 	{open: openCancelOrder, close: closeCancelOrder},
	// 	{setValueState, valueState},
	// ] = useDisclosure<
	// 	Pick<
	// 		CreateCancelOrderInput,
	// 		'is_all' | 'order_detail_uuid' | 'order_uuid'
	// 	> & {product_name: string}
	// >({initialState: false});

	const {createServeOrder} = useCreateServeOrderViewModel({
		onSuccess: _data => {
			const data = _data as ServeOrder;
			if (data) {
				queryClient.invalidateQueries([GetOrdersQueryKey]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
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

	// const onOpenCancelOrder = (
	// 	is_all: boolean,
	// 	order_uuid: string,
	// 	order_detail_uuid: string,
	// 	product_name: string,
	// ) => {
	// 	setValueState({
	// 		is_all,
	// 		order_uuid,
	// 		order_detail_uuid,
	// 		product_name,
	// 	});
	// 	openCancelOrder();
	// };

	return (
		<section className="h-full">
			<aside className="h-full">
				{/* <div className="flex items-center justify-between">
					<p className="text-xxl-bold">Order details</p>
					<CgTrash
						size={20}
						className="cursor-pointer text-neutral-70"
						onClick={toggleShowDeleteOrder}
					/>
				</div> */}

				<div className="w-full h-fit flex bg-slate-100 rounded-full border border-neutral-50">
					{listOrderTabs.map(tab =>
						tabValueOrder === tab.value ? (
							<Button
								key={tab.value}
								className="w-1/2 text-m-bold"
								onClick={() => setTabValueOrder(tabValueOrder === 0 ? 1 : 0)}
							>
								{tab.label}
							</Button>
						) : (
							<p
								key={tab.value}
								onClick={() => {
									setTabValueOrder(tabValueOrder === 1 ? 0 : 1);
								}}
								className="w-1/2 flex items-center justify-center text-m-bold"
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
						{/* {!showDeleteOrder && (
							<div className="my-4 flex w-full items-center justify-center gap-1 rounded-lg border border-neutral-40 py-2 text-m-semibold">
								Order time:
								{dataTransaction && dataTransaction?.first_order_at > 0 ? (
									<CountUpTimer startTime={dataTransaction?.first_order_at} />
								) : (
									<div className="mx-0.5">-</div>
								)}
								<AiOutlineInfoCircle />
							</div>
						)} */}

						{!dataOrder && (
							<div className="my-4 bg-neutral-20 h-full flex items-center justify-center">
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
							dataOrder.map((order, idx) => (
								<div
									key={order.uuid}
									className="my-4 p-4 border border-neutral-40 rounded-lg w-full"
								>
									<div className="flex items-center justify-between text-m-semibold pb-2 mb-2.5 border-b border-neutral-30">
										<p>{`Order ${idx + 1}`}</p>
										{generateStatusOrder(order.status)}
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
												<div key={orderDetail.uuid} className="text-m-regular">
													{orderDetail.product_name} x{orderDetail.qty}
												</div>
											),
										)}
									</div>
								</div>
							))}

						{/* {dataOrder &&
							dataOrder.map((order, idx) => (
								<div key={order.uuid} className="my-4 w-full">
									<div className="flex items-center justify-between text-m-semibold">
										<p>{`Order ${idx + 1}`}</p>
										{order.status !== OrderStatus.ORDER_CANCELLED && (
											<div
												className="cursor-pointer text-red-accent duration-150"
												role="presentation"
												onClick={() =>
													onOpenCancelOrder(true, order.uuid, '', '')
												}
											>
												Cancel Order
											</div>
										)}
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
												{orderDetail.status !== OrderDetailStatus.CANCEL && (
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
												)}
											</div>
										))}
									</div>
								</div>
							))} */}

						{dataOrder && dataOrder?.length > 0 && (
							<Can I="create" an="order">
								<Button
									variant="secondary"
									fullWidth
									size="l"
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
					<>
						{!dataOrder && (
							<div className="my-4 bg-neutral-20 h-2/3 flex items-center justify-center">
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
					</>
				)}
			</aside>

			{/* {isOpenCancelOrder && (
				<CancelOrderModal
					isOpen={isOpenCancelOrder}
					close={closeCancelOrder}
					value={valueState}
				/>
			)} */}
		</section>
	);
};

export default OrderDetails;
