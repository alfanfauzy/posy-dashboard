import {MakePayment} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeSelectedTrxId} from '@/view/common/store/slices/transaction';
import {onChangePayment} from '@/view/common/store/slices/transaction';
import {toRupiah} from '@/view/common/utils/common';
import {useCreatePrintReceiptViewModel} from '@/view/transaction/view-models/CreatePrintReceiptViewModel';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React, {useRef} from 'react';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {useReactToPrint} from 'react-to-print';

import PrintBillReceipt from '../receipt/PrintBillReceipt';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type PaymentConfirmationModalProps = {
	isOpenPaymentConfirmation: boolean;
	closePaymentConfirmation: () => void;
	valueState: MakePayment | undefined;
};

const PaymentConfirmationModal = ({
	closePaymentConfirmation,
	isOpenPaymentConfirmation,
	valueState,
}: PaymentConfirmationModalProps) => {
	const dispatch = useAppDispatch();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const printReceiptRef = useRef<any>();
	const {outletId} = useAppSelector(state => state.auth);
	const {selectedTrxId} = useAppSelector(state => state.transaction);

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
		closePaymentConfirmation();
		dispatch(onChangeSelectedTrxId({id: ''}));
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
			open={isOpenPaymentConfirmation}
			handleClose={onClosePaymentConfirmation}
			className="min-w-[382px] overflow-auto"
		>
			{valueState && (
				<section>
					<div className="flex flex-col items-center justify-center">
						<BsFillCheckCircleFill size={52} className="text-green-success" />
						<p className="mt-2 text-xxl-semibold text-primary-main">
							Payment completed!
						</p>
						<p className="text-l-regular text-neutral-70">
							{`ID: ${valueState.transaction_code}`}
						</p>
					</div>
					<div className="mt-3 flex flex-col gap-2 border-t border-neutral-30 py-3">
						<div className="flex items-center justify-between">
							<p className="text-l-semibold text-primary-main">Total amount</p>
							<p className="text-l-semibold text-primary-main">
								{toRupiah(valueState.total_amount)}
							</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-m-regular text-primary-main">Payment type</p>
							<p className="text-m-semibold text-primary-main">
								{valueState.payment_method_category}
							</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-m-regular text-primary-main">Provider</p>
							<p className="text-m-semibold text-primary-main">
								{valueState.payment_method}
							</p>
						</div>
					</div>
					<div className="border-t border-neutral-30 py-2">
						<div className="flex items-center justify-between">
							<p className="text-l-semibold text-primary-main">Amount paid</p>
							<p className="text-l-semibold text-primary-main">
								{toRupiah(valueState.paid_amount)}
							</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-l-semibold text-primary-main">Change</p>
							<p className="text-l-semibold text-primary-main">
								{toRupiah(valueState.paid_amount - valueState.total_amount)}
							</p>
						</div>
					</div>
					<div className="mt-4 xl:mt-12 flex items-center justify-center gap-4">
						<Button
							size="xl"
							variant="secondary"
							className="w-1/2"
							onClick={onClosePaymentConfirmation}
						>
							Close
						</Button>
						<Button
							isLoading={loadReceipt}
							size="xl"
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

export default PaymentConfirmationModal;
