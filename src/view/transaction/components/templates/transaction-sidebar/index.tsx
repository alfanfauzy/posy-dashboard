import {QrCode} from '@/domain/qr-code/model';
import {MakePayment} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import {Can} from '@/view/auth/components/organisms/rbac';
import NoOrderIcon from '@/view/common/assets/icons/noOrder';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {useGetOrdersViewModel} from '@/view/order/view-models/GetOrdersViewModel';
import {validationSchemaUpdateTransaction} from '@/view/transaction/schemas/update-transaction';
import {useGetQrCodeViewModel} from '@/view/transaction/view-models/GetQrCodeViewModel';
import {useGetTransactionViewModel} from '@/view/transaction/view-models/GetTransactionViewModel';
import {Button, Loading} from 'posy-fnb-core';
import React, {useRef, useState} from 'react';
import {AiOutlinePercentage} from 'react-icons/ai';
import {useReactToPrint} from 'react-to-print';

import EditTransactionForm from '../../organisms/form/EditTransactionForm';
import ApplyDiscountModal from '../../organisms/modal/ApplyDiscountModal';
import CreatePaymentModal from '../../organisms/modal/CreatePaymentModal';
import PaymentConfirmationModal from '../../organisms/modal/PaymentConfirmationModal';
import PrintToKitchenModal from '../../organisms/modal/PrintToKitchenModal';
import OrderDetails from '../../organisms/order-details';
import PrintQrCodeReceipt from '../../organisms/receipt/PrintQrCodeReceipt';
import TransactionDetails from '../../organisms/transaction-details';
import ManualSubmitOrder from '../manual-order';

const TransactionSidebar = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const qrRef = useRef<any>();
	const {
		selectedTrxId,
		payment: {discount_percentage},
	} = useAppSelector(state => state.transaction);

	const [tabValueorder, setTabValueOrder] = useState(0);

	const [isOpenCreateOrder, {open: openCreateOrder, close: closeCreateOrder}] =
		useDisclosure({initialState: false});

	const [
		isOpenPrintToKitchen,
		{open: openPrintToKitchen, close: closePrintToKitchen},
	] = useDisclosure({initialState: false});

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

	const {
		getQrCode,
		data: dataQrCode,
		isLoading: loadQrCode,
	} = useGetQrCodeViewModel({
		onSuccess: _data => {
			const data = _data as QrCode;
			if (data) {
				setTimeout(() => {
					handlePrintQr();
				}, 100);
			}
		},
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
								<Can I="reprint-qrcode" an="transaction">
									<Button
										fullWidth
										variant="secondary"
										onClick={() =>
											getQrCode({
												transaction_uuid: selectedTrxId,
											})
										}
										isLoading={loadQrCode}
									>
										<p className="whitespace-nowrap text-m-semibold">
											Reprint QR
										</p>
									</Button>
								</Can>
								{dataOrder && dataOrder?.length > 0 && (
									<Can I="print_to_kitchen" an="order">
										<Button
											variant="primary"
											fullWidth
											onClick={openPrintToKitchen}
											className="whitespace-nowrap text-m-semibold"
										>
											Print to Kitchen
										</Button>
									</Can>
								)}
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
								<Can I="payment" an="transaction">
									<Button
										variant="primary"
										fullWidth
										onClick={openCreatePayment}
										className="whitespace-nowrap text-m-semibold"
									>
										Payment
									</Button>
								</Can>
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

			{dataQrCode && (
				<PrintQrCodeReceipt data={dataQrCode} printReceiptRef={qrRef} />
			)}

			{isOpenPrintToKitchen && dataOrder && (
				<PrintToKitchenModal
					isOpenPrintToKitchen={isOpenPrintToKitchen}
					onClosePrintToKitchen={closePrintToKitchen}
					dataOrder={dataOrder}
				/>
			)}
		</main>
	);
};

export default TransactionSidebar;
