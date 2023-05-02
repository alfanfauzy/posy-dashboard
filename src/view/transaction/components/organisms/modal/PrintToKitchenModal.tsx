import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {Orders} from '@/domain/order/model';
import {CreatePrintOrderToKitchenModel} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';
import {useAppSelector} from '@/view/common/store/hooks';
import {useCreatePrintOrderToKitchenViewModel} from '@/view/order/view-models/CreatePrintOrderToKitchenViewModel';
import {useQueryClient} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {Button, Checkbox} from 'posy-fnb-core';
import React, {useRef} from 'react';
import {useReactToPrint} from 'react-to-print';

import PrintToKitchenReceipt from '../receipt/PrintToKitchenReceipt';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

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
				showCloseButton
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
							Printed to kitchen
						</Button>
					</div>
				}
			>
				<section className="px-8 pb-2">
					{dataOrder.map((order, idx) => (
						<div key={order.uuid} className="my-4 w-full">
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
								{order.order_detail?.map(orderDetail => (
									<div
										key={orderDetail.uuid}
										className="my-2 flex items-center justify-between"
									>
										<p className="text-m-regular">{`${orderDetail.product_name} x${orderDetail.qty}`}</p>
									</div>
								))}
								<div className="flex items-center justify-between">
									<p className="text-m-regular">status</p>
									{order.is_printed ? (
										<p className="text-m-regular text-green-success">
											Printed to kitchen
										</p>
									) : (
										<p>-</p>
									)}
								</div>
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
