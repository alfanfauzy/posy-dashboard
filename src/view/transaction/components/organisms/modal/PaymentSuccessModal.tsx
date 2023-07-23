import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangePaymentSuccess,
	onChangeSelectedTrxId,
} from '@/view/common/store/slices/transaction';
import {onChangePayment} from '@/view/common/store/slices/transaction';
import {toRupiah} from '@/view/common/utils/common';
import {useCreatePrintReceiptViewModel} from '@/view/transaction/view-models/CreatePrintReceiptViewModel';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React, {useRef} from 'react';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {useReactToPrint} from 'react-to-print';

import PrintBillReceipt from '../receipt/PrintBillReceipt';

const Modal = dynamic(() => import('posy-fnb-core').then(mod => mod.Modal), {
	loading: () => <div />,
});

const PaymentSuccessModal = () => {
	const dispatch = useAppDispatch();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedTrxId, paymentSuccess} = useAppSelector(
		state => state.transaction,
	);
	const {isOpen, payload} = paymentSuccess;

	const printReceiptRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

	const handlePrintReceiptRef = useReactToPrint({
		content: () => printReceiptRef.current,
	});

	const {
		data: dataReceipt,
		createPrintReceipt,
		isLoading: loadReceipt,
	} = useCreatePrintReceiptViewModel({
		onSuccess: data => {
			if (data) {
				setTimeout(() => {
					handlePrintReceiptRef();
				}, 100);
			}
		},
	});

	const onClosePaymentConfirmation = () => {
		dispatch(onChangeSelectedTrxId({id: ''}));
		dispatch(
			onChangePaymentSuccess({
				isOpen: false,
				payload: null,
			}),
		);
		dispatch(
			onChangePayment({
				payment: {
					discount_percentage: 0,
					subtotal: 0,
					total: 0,
				},
			}),
		);
	};

	return (
		<Modal
			closeOverlay
			open={isOpen}
			handleClose={onClosePaymentConfirmation}
			className="min-w-[382px] overflow-auto"
		>
			{payload && (
				<section>
					<div className="flex flex-col items-center justify-center">
						<BsFillCheckCircleFill size={38} className="text-green-success" />
						<p className="mt-1 text-xl-semibold text-primary-main">
							Payment completed!
						</p>
						<p className="text-m-regular text-neutral-70">
							{`ID: ${payload.transaction_code}`}
						</p>
					</div>
					<div className="mt-2 flex flex-col gap-1 border-t border-neutral-30 py-2">
						<div className="flex items-center justify-between">
							<p className="text-m-semibold text-primary-main">Total amount</p>
							<p className="text-m-semibold text-primary-main">
								{toRupiah(payload.total_amount)}
							</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-m-regular text-primary-main">Payment type</p>
							<p className="text-m-semibold text-primary-main">
								{payload.payment_method_category}
							</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-m-regular text-primary-main">Provider</p>
							<p className="text-m-semibold text-primary-main">
								{payload.payment_method}
							</p>
						</div>
					</div>
					<div className="border-t border-neutral-30 py-2">
						<div className="flex items-center justify-between">
							<p className="text-m-semibold text-primary-main">Amount paid</p>
							<p className="text-m-semibold text-primary-main">
								{toRupiah(payload.paid_amount)}
							</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-m-semibold text-primary-main">Change</p>
							<p className="text-m-semibold text-primary-main">
								{toRupiah(payload.paid_amount - payload.total_amount)}
							</p>
						</div>
					</div>
					<div className="mt-2.5 xl:mt-12 flex items-center justify-center gap-4">
						<Button
							size="l"
							variant="secondary"
							className="w-1/2"
							onClick={onClosePaymentConfirmation}
						>
							Close
						</Button>
						<Button
							isLoading={loadReceipt}
							size="l"
							className="w-1/2"
							onClick={() =>
								createPrintReceipt({
									transaction_uuid: selectedTrxId,
									restaurant_outlet_uuid: outletId,
								})
							}
						>
							Print Receipt
						</Button>
					</div>
				</section>
			)}

			{dataReceipt && (
				<PrintBillReceipt
					data={dataReceipt}
					printReceiptRef={printReceiptRef}
				/>
			)}
		</Modal>
	);
};

export default PaymentSuccessModal;
