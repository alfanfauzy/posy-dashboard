import useDisclosure from '@/hooks/useDisclosure';
import {useForm} from '@/hooks/useForm';
import NoOrderIcon from '@/icons/noOrder';
import {useAppSelector} from '@/store/hooks';
import {validationSchemaUpdateTransaction} from '@/view/transaction/schemas/update-transaction';
import {useGetTransactionViewModel} from '@/view/transaction/view-models/GetTransactionViewModel';
import {Button, Loading} from 'posy-fnb-core';
import React, {RefObject, useRef, useState} from 'react';
import {AiOutlinePercentage} from 'react-icons/ai';
import {useReactToPrint} from 'react-to-print';

import EditTransactionForm from '../../organisms/form/EditTransactionForm';
import ApplyDiscountModal from '../../organisms/modal/ApplyDiscountModal';
import CreatePaymentModal from '../../organisms/modal/CreatePaymentModal';
import PaymentConfirmationModal from '../../organisms/modal/PaymentConfirmationModal';
import OrderDetails from '../../organisms/order-details';
import TransactionDetails from '../../organisms/transaction-details';
import ManualSubmitOrder from '../manual-order';

type TransactionSidebarProps = {
	qrRef: RefObject<HTMLDivElement>;
};

const TransactionSidebar = ({qrRef}: TransactionSidebarProps) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const printToKitchenRef = useRef<any>();
	const {selectedTrxId} = useAppSelector(state => state.transaction);

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
	] = useDisclosure({initialState: false});

	const [
		isOpenApplyDiscount,
		{open: openApplyDiscount, close: closeApplyDiscount},
	] = useDisclosure({initialState: false});

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
							restaurant_outlet_table_uuid: '' as any,
							transaction_category: '' as any,
						});
					}
				},
			},
		);

	const handlePrintQr = useReactToPrint({
		content: () => qrRef.current,
	});

	const handlePrintToKitchen = useReactToPrint({
		content: () => printToKitchenRef.current,
	});

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

			{dataTransaction && (
				<article className="flex h-full flex-col">
					<section className="h-full px-4 py-6">
						<TransactionDetails dataTransaction={dataTransaction} />
						<div className="h-full overflow-y-auto">
							<EditTransactionForm methods={methods} />
							<OrderDetails
								dataTransaction={dataTransaction}
								printToKitchenRef={printToKitchenRef}
								setTabValueOrder={setTabValueOrder}
								tabValueOrder={tabValueorder}
								openCreateOrder={openCreateOrder}
								showDeleteOrder={showDeleteOrder}
								toggleShowDeleteOrder={toggleShowDeleteOrder}
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
									onClick={handlePrintToKitchen}
									className="whitespace-nowrap text-m-semibold"
								>
									Print to Kitchen
								</Button>
							</div>
						)}
						{!showDeleteOrder && tabValueorder === 1 && (
							<div className="flex gap-2">
								<Button variant="secondary" onClick={openApplyDiscount}>
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
				/>
			)}

			{isOpenPaymentConfirmation && (
				<PaymentConfirmationModal
					closePaymentConfirmation={closePaymentConfirmation}
					isOpenPaymentConfirmation={isOpenPaymentConfirmation}
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
		</main>
	);
};

export default TransactionSidebar;
