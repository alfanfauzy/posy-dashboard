import {GetAreasQueryKey} from '@/data/area/sources/GetAreasQuery';
import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {Order, OrderStatus, Orders} from '@/domain/order/model';
import {CreatePrintOrderToKitchenModel} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeIsOpenPrintToKitchen} from '@/view/common/store/slices/order';
import {generateStatusOrder} from '@/view/common/utils/UtilsGenerateOrderStatus';
import {useCreatePrintOrderToKitchenViewModel} from '@/view/order/view-models/CreatePrintOrderToKitchenViewModel';
import {
	generateBgColorOrderStatus,
	generateBorderColorOrderStatus,
} from '@/view/transaction/utils/common';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button, Checkbox} from 'posy-fnb-core';
import React, {useEffect, useRef, useState} from 'react';
import {useReactToPrint} from 'react-to-print';

import PrintToKitchenReceipt from '../receipt/PrintToKitchenReceipt';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type PrintToKitchenModalProps = {
	dataOrder: Orders;
};

const PrintToKitchenModal = ({dataOrder}: PrintToKitchenModalProps) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedTrxId} = useAppSelector(state => state.transaction);
	const {isOpenPrintToKitchen} = useAppSelector(state => state.order);

	const [loading, setLoading] = useState<boolean>(false);

	const printToKitchenRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

	const [selectedOrder, setSelectedOrder] = React.useState<Array<string>>([]);

	const handlePrintToKitchen = useReactToPrint({
		content: () => printToKitchenRef.current,
	});

	const handleClosePrintToKitchen = () => {
		dispatch(onChangeIsOpenPrintToKitchen(false));
		setSelectedOrder([]);
	};

	const {
		createPrintOrderToKitchen,
		data: dataPrintToKitchen,
		isLoading: loadPrintToKitchen,
	} = useCreatePrintOrderToKitchenViewModel({
		onSuccess: _data => {
			const data = _data as CreatePrintOrderToKitchenModel;
			if (data) {
				setTimeout(() => {
					handlePrintToKitchen();
					handleClosePrintToKitchen();
				}, 100);
				queryClient.invalidateQueries([GetOrdersQueryKey]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				queryClient.invalidateQueries([GetTransactionsQueryKey]);
				queryClient.invalidateQueries([GetAreasQueryKey]);
			}
		},
	});

	const onPrintToKitchen = () => {
		{
			dataOrder &&
				createPrintOrderToKitchen({
					transaction_uuid: selectedTrxId,
					restaurant_outlet_uuid: outletId,
					order_uuids: Array.from(new Set(selectedOrder)),
				});
		}
	};

	useEffect(() => {
		if (dataOrder) {
			dataOrder.map(order =>
				order.status === OrderStatus.ORDER_NEED_TO_PRINT
					? setSelectedOrder(prev => Array.from(new Set([...prev, order.uuid])))
					: () => undefined,
			);
		}
	}, [dataOrder]);

	const handleCheckAllOrder = () => {
		setLoading(true);
		if (selectedOrder.length === dataOrder.length) {
			setSelectedOrder(() => []);
			setTimeout(() => {
				setLoading(false), 100;
			});
		} else {
			setSelectedOrder(() => dataOrder.map(item => item.uuid));
			setTimeout(() => {
				setLoading(false), 100;
			});
		}
	};

	const handleCheckOrder = (order: Order) => {
		setLoading(true);
		if (!selectedOrder.includes(order.uuid)) {
			setSelectedOrder(prev => [...prev, order.uuid]);
			setTimeout(() => {
				setLoading(false);
			}, 100);
		} else {
			setSelectedOrder(prev => prev.filter(item => item !== order.uuid));
			setTimeout(() => {
				setLoading(false);
			}, 100);
		}
	};

	return (
		<>
			<Modal
				open={isOpenPrintToKitchen}
				handleClose={handleClosePrintToKitchen}
				style={{
					maxWidth: '40%',
					width: '80%',
					padding: 0,
				}}
				closeOverlay
				showCloseButton
				title="Print to kitchen"
				confirmButton={
					<div className="flex w-full items-center justify-center gap-4">
						<Button
							variant="secondary"
							onClick={handleClosePrintToKitchen}
							fullWidth
						>
							Cancel
						</Button>
						<Button
							className="whitespace-nowrap"
							variant="primary"
							onClick={onPrintToKitchen}
							isLoading={loadPrintToKitchen}
							disabled={selectedOrder.length === 0}
							fullWidth
						>
							Print to kitchen
						</Button>
					</div>
				}
			>
				<section className="px-8 pb-2">
					{!loading && (
						<>
							<div className="mt-4 border border-neutral-40 rounded-lg px-4 py-2">
								<Checkbox
									className="w-full"
									title="Select all"
									size="m"
									onChange={handleCheckAllOrder}
									checked={selectedOrder.length === dataOrder.length}
								/>
							</div>
							{dataOrder.map((order, idx) => (
								<div
									onClick={() => handleCheckOrder(order)}
									key={order.uuid}
									className={`my-4 px-4 pb-4 pt-2  w-full rounded-lg ${generateBorderColorOrderStatus(
										order.status,
										selectedOrder.includes(order.uuid),
									)} ${generateBgColorOrderStatus(order.status)}`}
								>
									<div className="flex items-center justify-between text-m-semibold">
										<div className="cursor-pointer w-full">
											<Checkbox
												title={
													<span className="text-m-bold">
														{`Order ${idx + 1}`}
													</span>
												}
												size="m"
												onChange={() => undefined}
												checked={selectedOrder.includes(order.uuid)}
											/>
										</div>
									</div>
									<div className="mt-1 w-full">
										<div className="flex items-center justify-between">
											<p className="text-m-regular">status</p>
											{generateStatusOrder(order.status)}
										</div>
										{order.order_detail?.map(orderDetail => (
											<div
												key={orderDetail.uuid}
												className="my-2 flex items-center justify-between"
											>
												<p className="text-m-regular">{`${orderDetail.product_name} x${orderDetail.qty}`}</p>
											</div>
										))}
									</div>
								</div>
							))}
						</>
					)}
				</section>
			</Modal>

			{dataPrintToKitchen && (
				<PrintToKitchenReceipt
					dataPrintToKitchen={dataPrintToKitchen}
					printToKitchenRef={printToKitchenRef}
				/>
			)}
		</>
	);
};

export default PrintToKitchenModal;
