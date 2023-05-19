import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {OrderStatus, Orders} from '@/domain/order/model';
import {CreatePrintOrderToKitchenModel} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';
import {useAppSelector} from '@/view/common/store/hooks';
import {useCreatePrintOrderToKitchenViewModel} from '@/view/order/view-models/CreatePrintOrderToKitchenViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button, Checkbox} from 'posy-fnb-core';
import React, {useEffect, useRef} from 'react';
import {useReactToPrint} from 'react-to-print';

import {generateStatusOrder} from '../order-details';
import PrintToKitchenReceipt from '../receipt/PrintToKitchenReceipt';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

const generateBgColor = (status: OrderStatus) => {
	switch (status) {
		case '0':
			return 'bg-neutral-10';
		case '1':
			return 'bg-neutral-10';
		case '2':
			return 'bg-[#FFFCF0]';
		case '3':
			return 'bg-[#EEFFEF]';
		case '4':
			return 'bg-red-caution/10';
		default:
			return 'bg-blue-success';
	}
};

const generateBorderColor = (status: OrderStatus, isChecked: boolean) => {
	if (isChecked) {
		switch (status) {
			case '0':
				return 'bg-neutral-10 border-2 border-secondary-main';
			case '1':
				return 'bg-neutral-10 border-2 border-secondary-main';
			case '2':
				return 'border-2 border-[#C69A00]';
			case '3':
				return 'border-2 border-green-success';
			case '4':
				return 'bg-red-caution/10 border-2 border-red-caution';
			default:
				return 'bg-blue-success border-2 border-secondary-main';
		}
	}

	return 'border border-neutral-40';
};

type PrintToKitchenModalProps = {
	isOpenPrintToKitchen: boolean;
	onClosePrintToKitchen: () => void;
	dataOrder: Orders;
};

const PrintToKitchenModal = ({
	isOpenPrintToKitchen,
	onClosePrintToKitchen,
	dataOrder,
}: PrintToKitchenModalProps) => {
	const queryClient = useQueryClient();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedTrxId} = useAppSelector(state => state.transaction);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const printToKitchenRef = useRef<any>();

	const [selectedOrder, setSelectedOrder] = React.useState<Array<string>>([]);

	const handlePrintToKitchen = useReactToPrint({
		content: () => printToKitchenRef.current,
	});

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
					onClosePrintToKitchen();
				}, 100);
				queryClient.invalidateQueries([GetOrdersQueryKey]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
			}
		},
	});

	const onPrintToKitchen = () => {
		{
			dataOrder &&
				createPrintOrderToKitchen({
					transaction_uuid: selectedTrxId,
					restaurant_outlet_uuid: outletId,
					order_uuids: selectedOrder,
				});
		}
	};

	// useEffect(() => {
	// 	setSelectedOrder()

	// }, [dataOrder]);

	return (
		<>
			<Modal
				open={isOpenPrintToKitchen}
				handleClose={onClosePrintToKitchen}
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
							onClick={onClosePrintToKitchen}
							fullWidth
						>
							Cancel
						</Button>
						<Button
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
					{dataOrder.map((order, idx) => (
						<div
							key={order.uuid}
							className={`my-4 px-4 pb-4 pt-2  w-full rounded-lg ${generateBorderColor(
								order.status,
								selectedOrder.includes(order.uuid),
							)} ${generateBgColor(order.status)}`}
						>
							<div className="flex items-center justify-between text-m-semibold">
								<p>{`Order ${idx + 1}`}</p>
								<div className="cursor-pointer">
									<Checkbox
										size="m"
										onChange={() => {
											if (!selectedOrder.includes(order.uuid))
												setSelectedOrder(prev => [...prev, order.uuid]);
											else
												setSelectedOrder(prev =>
													prev.filter(item => item !== order.uuid),
												);
										}}
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
