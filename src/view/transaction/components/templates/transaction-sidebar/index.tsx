import {GetOrdersQueryKey} from '@/data/order/sources/GetOrdersQuery';
import {CreatePrintOrderToKitchenModel} from '@/domain/order/repositories/CreatePrintOrderToKitchenRepository';
import {MakePayment} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import NoOrderIcon from '@/view/common/assets/icons/noOrder';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {useCreatePrintOrderToKitchenViewModel} from '@/view/order/view-models/CreatePrintOrderToKitchenViewModel';
import {useGetOrdersViewModel} from '@/view/order/view-models/GetOrdersViewModel';
import {validationSchemaUpdateTransaction} from '@/view/transaction/schemas/update-transaction';
import {useGetTransactionViewModel} from '@/view/transaction/view-models/GetTransactionViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Button, Loading} from 'posy-fnb-core';
import React, {RefObject, useRef, useState} from 'react';
import {AiOutlinePercentage} from 'react-icons/ai';
import {useReactToPrint} from 'react-to-print';

import EditTransactionForm from '../../organisms/form/EditTransactionForm';
import ApplyDiscountModal from '../../organisms/modal/ApplyDiscountModal';
import CreatePaymentModal from '../../organisms/modal/CreatePaymentModal';
import PaymentConfirmationModal from '../../organisms/modal/PaymentConfirmationModal';
import OrderDetails from '../../organisms/order-details';
import PrintToKitchenReceipt from '../../organisms/receipt/PrintToKitchenReceipt';
import TransactionDetails from '../../organisms/transaction-details';
import ManualSubmitOrder from '../manual-order';

type TransactionSidebarProps = {
	qrRef: RefObject<HTMLDivElement>;
};

const TransactionSidebar = ({qrRef}: TransactionSidebarProps) => {
	const queryClient = useQueryClient();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const printToKitchenRef = useRef<any>();
	const {
		selectedTrxId,
		payment: {discount_percentage},
	} = useAppSelector(state => state.transaction);
	const {outletId} = useAppSelector(state => state.auth);

	const [tabValueorder, setTabValueOrder] = useState(0);

	const [isOpenCreateOrder, {open: openCreateOrder, close: closeCreateOrder}] =
		useDisclosure({initialState: false});

	const [
		showDeleteOrder,
		{toggle: toggleShowDeleteOrder, close: closeDeleteOrder},
	] = useDisclosure({
		initialState: false,
	});

	const [
		isOpenCreatePayment,
		{open: openCreatePayment, close: closeCreatePayment},
	] = useDisclosure({initialState: false});

	const [
		isOpenPaymentConfirmation,
		{open: openPaymentConfirmation, close: closePaymentConfirmation},
		{valueState, setValueState},
	] = useDisclosure<MakePayment>({initialState: false});

	const [
		isOpenApplyDiscount,
		{open: openApplyDiscount, close: closeApplyDiscount},
	] = useDisclosure({
		initialState: false,
	});

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
						if (data?.data?.restaurant_outlet_table_uuid) {
							setValue('restaurant_outlet_table_uuid', {
								label: data?.data?.table_number,
								value: data?.data?.restaurant_outlet_table_uuid,
							});
						}
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
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							restaurant_outlet_table_uuid: '' as any,
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							transaction_category: '' as any,
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

	const handlePrintQr = useReactToPrint({
		content: () => qrRef.current,
	});

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
				}, 100);
				queryClient.invalidateQueries([GetOrdersQueryKey]);
			}
		},
	});

	const onPrintToKitchen = () => {
		{
			dataOrder &&
				createPrintOrderToKitchen({
					transaction_uuid: selectedTrxId,
					restaurant_outlet_uuid: outletId,
					order_uuids: dataOrder.map(order => order.uuid),
				});
		}
	};

	return (
		<main className="relative w-[340px] rounded-l-2xl bg-neutral-10">
			{!selectedTrxId && (
				<div className="h-full w-full p-6">
					<p className="text-xxl-bold">Transaction Details</p>

					<div className="flex h-full w-full flex-col items-center justify-center gap-4">
						<NoOrderIcon />
						<p className="text-l-medium">There’s no order yet</p>
					</div>
				</div>
			)}

			{loadTransaction && (
				<div className="-mt-10 flex h-full w-full items-center justify-center">
					<Loading size={75} />
				</div>
			)}

			{selectedTrxId && (
				<article className="flex h-full flex-col">
					<section className="h-full px-4 py-6">
						<TransactionDetails dataTransaction={dataTransaction} />

						<div className="h-full overflow-y-auto">
							<EditTransactionForm methods={methods} />

							<OrderDetails
								dataTransaction={dataTransaction}
								setTabValueOrder={setTabValueOrder}
								tabValueOrder={tabValueorder}
								openCreateOrder={openCreateOrder}
								showDeleteOrder={showDeleteOrder}
								toggleShowDeleteOrder={toggleShowDeleteOrder}
								dataOrder={dataOrder}
								loadOrder={loadOrder}
							/>
						</div>
					</section>

					<section className="absolute bottom-0 w-full rounded-bl-2xl bg-white p-4 shadow-basic">
						{showDeleteOrder && (
							<Button variant="secondary" onClick={closeDeleteOrder} fullWidth>
								<p className="whitespace-nowrap text-m-semibold">
									Back to order details
								</p>
							</Button>
						)}
						{!showDeleteOrder && tabValueorder === 0 && (
							<div className="flex gap-2">
								<Button variant="secondary" onClick={handlePrintQr}>
									<p className="whitespace-nowrap text-m-semibold">
										Reprint QR
									</p>
								</Button>
								<Button
									variant="primary"
									fullWidth
									isLoading={loadPrintToKitchen}
									onClick={onPrintToKitchen}
									className="whitespace-nowrap text-m-semibold"
								>
									Print to Kitchen
								</Button>
							</div>
						)}
						{!showDeleteOrder && tabValueorder === 1 && (
							<div className="flex gap-2">
								<Button
									variant="secondary"
									onClick={openApplyDiscount}
									className={`${
										discount_percentage > 0 ? 'bg-secondary-border' : ''
									}`}
								>
									<div className="rounded-full border-[1.5px] border-neutral-90 p-0.5">
										<AiOutlinePercentage />
									</div>
								</Button>
								<Button
									variant="primary"
									fullWidth
									onClick={openCreatePayment}
									className="whitespace-nowrap text-m-semibold"
								>
									Payment
								</Button>
							</div>
						)}
					</section>
				</article>
			)}

			{isOpenCreatePayment && (
				<CreatePaymentModal
					closeCreatePayment={closeCreatePayment}
					isOpenCreatePayment={isOpenCreatePayment}
					openPaymentConfirmation={openPaymentConfirmation}
					setValueState={setValueState}
				/>
			)}

			{isOpenPaymentConfirmation && (
				<PaymentConfirmationModal
					closePaymentConfirmation={closePaymentConfirmation}
					isOpenPaymentConfirmation={isOpenPaymentConfirmation}
					valueState={valueState}
				/>
			)}

			{isOpenApplyDiscount && (
				<ApplyDiscountModal
					closeApplyDiscount={closeApplyDiscount}
					isOpenApplyDiscount={isOpenApplyDiscount}
				/>
			)}

			{dataTransaction && (
				<ManualSubmitOrder
					closeCreateOrder={closeCreateOrder}
					isOpenCreateOrder={isOpenCreateOrder}
					dataTransaction={dataTransaction}
				/>
			)}

			{dataPrintToKitchen && (
				<PrintToKitchenReceipt
					dataPrintToKitchen={dataPrintToKitchen}
					printToKitchenRef={printToKitchenRef}
				/>
			)}
		</main>
	);
};

export default TransactionSidebar;
