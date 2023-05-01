import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {MakePayment} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import {useAppSelector} from '@/view/common/store/hooks';
import {toRupiah} from '@/view/common/utils/common';
import {generateSuggestionAmount} from '@/view/common/utils/UtilsGenerateSuggestionAmount';
import {useGetPaymentMethodCategoriesViewModel} from '@/view/payment-method/view-models/GetPaymentMethodCategoriesViewModel';
import {useGetPaymentMethodsViewModel} from '@/view/payment-method/view-models/GetPaymentMethodsViewModel';
import {useCreateMakePaymentViewModel} from '@/view/transaction/view-models/CreateMakePaymentViewModel';
import {useCreatePrintReceiptViewModel} from '@/view/transaction/view-models/CreatePrintReceiptViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Modal} from 'antd';
import Image from 'next/image';
import {Button, Loading} from 'posy-fnb-core';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FiPrinter} from 'react-icons/fi';
import {NumericFormat} from 'react-number-format';
import {useReactToPrint} from 'react-to-print';

import PrintBillReceipt from '../receipt/PrintBillReceipt';

type CreatePaymentModalProps = {
	isOpenCreatePayment: boolean;
	closeCreatePayment: () => void;
	openPaymentConfirmation: () => void;
	setValueState: (value: MakePayment) => void;
};

const CreatePaymentModal = ({
	isOpenCreatePayment,
	closeCreatePayment,
	openPaymentConfirmation,
	setValueState,
}: CreatePaymentModalProps) => {
	const queryClient = useQueryClient();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const printReceiptRef = useRef<any>();
	const {outletId} = useAppSelector(state => state.auth);
	const {payment, selectedTrxId} = useAppSelector(state => state.transaction);
	const [selectedPaymentCategory, setSelectedPaymentCategory] = useState({
		type: '',
		uuid: '',
	});
	const [selectedPayment, setSelectedPayment] = useState('');
	const [additionalInfo, setAdditionalInfo] = useState('');
	const [suggestionPrice] = useState(payment.total || 0);
	const [price, setPrice] = useState(payment.total || 0);

	const suggestionAmount = useMemo(
		() => generateSuggestionAmount(suggestionPrice),
		[suggestionPrice],
	);

	const {
		data: dataPaymentMethodCategories,
		isLoading: loadPaymentMethodCategories,
	} = useGetPaymentMethodCategoriesViewModel({
		sort: {field: 'created_at', value: 'asc'},
		page: 1,
		limit: 50,
	});

	const {data: dataPaymentMethods, isLoading: loadPaymentMethods} =
		useGetPaymentMethodsViewModel(
			{
				sort: {field: 'created_at', value: 'desc'},
				page: 1,
				limit: 50,
				payment_method_category_uuid: selectedPaymentCategory.uuid,
			},
			{
				enabled: selectedPaymentCategory.uuid !== '',
			},
		);

	const {makePayment, isLoading} = useCreateMakePaymentViewModel({
		onSuccess: _data => {
			const data = _data as MakePayment;
			if (data) {
				setValueState(data);
				queryClient.invalidateQueries([GetTransactionsQueryKey]);
				closeCreatePayment();
				openPaymentConfirmation();
			}
		},
	});

	const handleMakePayment = () => {
		makePayment({
			transaction_uuid: selectedTrxId,
			restaurant_outlet_uuid: outletId,
			payment_method_uuid: selectedPayment,
			pay_amount: price,
			additional_info: additionalInfo,
		});
	};

	const handlePrintToKitchen = useReactToPrint({
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
					handlePrintToKitchen();
				}, 100);
			}
		},
	});

	useEffect(() => {
		if (dataPaymentMethods && selectedPaymentCategory.type === 'cash') {
			setSelectedPayment(dataPaymentMethods[0].uuid);
		}
	}, [selectedPaymentCategory, dataPaymentMethods]);

	return (
		<Modal
			open={isOpenCreatePayment}
			onCancel={closeCreatePayment}
			closable={false}
			footer={null}
			width={900}
			style={{
				top: 40,
			}}
		>
			<section className="flex h-full">
				<aside className="flex flex-col w-1/3 h-full overflow-auto items-center rounded-l-3xl bg-neutral-30 py-10">
					<div className="mb-6">
						<p className="text-xxl-semibold">Choose payment method</p>
					</div>
					{loadPaymentMethodCategories && (
						<div className="min-h-[380px] flex items-center">
							<Loading size={75} />
						</div>
					)}
					{!loadPaymentMethodCategories && dataPaymentMethodCategories && (
						<>
							<div className="flex w-full flex-col gap-4 xl:px-8">
								{dataPaymentMethodCategories.map(
									el =>
										el.is_show && (
											<div
												role="presentation"
												onClick={() => {
													setSelectedPaymentCategory({
														type: el.name.toLowerCase(),
														uuid: el.uuid,
													});
													setSelectedPayment('');
												}}
												key={el.name}
												className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
													selectedPaymentCategory.type === el.name.toLowerCase()
														? 'border-secondary-main bg-secondary-border'
														: 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-secondary-border hover:bg-opacity-70'
												}`}
											>
												<Image
													alt={el.name}
													width={28}
													height={28}
													src={el.logo_url}
													priority
												/>
												<p className="text-m-medium">{el.name}</p>
											</div>
										),
								)}
							</div>

							<div className="mt-14 w-full xl:px-8">
								<Button
									isLoading={loadReceipt}
									fullWidth
									className="flex items-center justify-center gap-3"
									onClick={() =>
										createPrintReceipt({
											transaction_uuid: selectedTrxId,
											restaurant_outlet_uuid: outletId,
										})
									}
								>
									<FiPrinter size={20} />
									Print Bill
								</Button>
							</div>
						</>
					)}
				</aside>

				<aside className="flex-1 p-10">
					<div className="relative h-full">
						<div className="mb-4 flex items-center gap-2">
							<p className="text-heading-s-regular">Total amount:</p>
							<p className="text-heading-s-bold">{toRupiah(payment.total)}</p>
						</div>
						{selectedPaymentCategory.type === 'cash' && (
							<>
								<div className="mt-4">
									<p className="text-xl-semibold">Input Payment Received</p>
									<NumericFormat
										className="mt-2 flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 p-4 text-center transition-all duration-300 ease-in-out focus:outline-none"
										thousandSeparator="."
										decimalSeparator=","
										prefix="Rp "
										onValueChange={(e: any) => setPrice(e.floatValue)}
										allowNegative={false}
										value={price}
									/>
								</div>
								<div className="mt-6 grid w-full grid-cols-2 gap-4">
									{suggestionAmount.slice(1).map(el => (
										<div
											key={el}
											role="presentation"
											onClick={() => setPrice(el)}
											className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
												selectedPaymentCategory.type !== 'cash'
													? 'border-secondary-main bg-secondary-border'
													: 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-secondary-border hover:bg-opacity-70'
											}`}
										>
											<p className="text-l-medium">{toRupiah(el)}</p>
										</div>
									))}
								</div>

								<div className="mt-4">
									<p className="text-xl-semibold">Change (auto filled)</p>
									<input
										className="mt-2 flex w-full items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 p-4 text-center transition-all duration-300 ease-in-out focus:outline-none disabled:bg-neutral-40"
										disabled
										value={toRupiah(price - payment.total)}
									/>
								</div>
							</>
						)}

						{loadPaymentMethods &&
							selectedPaymentCategory.uuid.length > 0 &&
							selectedPaymentCategory.type !== 'cash' && (
								<div className="w-full h-1/2 justify-center flex items-center">
									<Loading size={75} />
								</div>
							)}

						{selectedPaymentCategory.type !== 'cash' && dataPaymentMethods && (
							<aside className="grid grid-cols-4 gap-4">
								{dataPaymentMethods.map(paymentMethod => (
									<div
										onClick={() => setSelectedPayment(paymentMethod.uuid)}
										key={paymentMethod.name}
										className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
											selectedPayment === paymentMethod.uuid
												? 'border-secondary-main bg-secondary-border'
												: 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-secondary-border hover:bg-opacity-70'
										}`}
									>
										<Image
											alt={paymentMethod.name}
											width={72}
											height={28}
											src={paymentMethod.logo_url}
											priority
										/>
									</div>
								))}
							</aside>
						)}

						<div className="absolute bottom-0 w-full">
							{(selectedPaymentCategory.type === 'card' ||
								selectedPaymentCategory.type === 'bank transfer') && (
								<div className="mt-4 mb-7">
									<p className="text-xl-semibold">Trace number (Optional)</p>
									<input
										onChange={e => setAdditionalInfo(e.target.value)}
										className="mt-2 flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 p-4 text-center transition-all duration-300 ease-in-out focus:outline-none"
										placeholder="ex: 333456"
									/>
								</div>
							)}
							<div>
								<Button
									isLoading={isLoading}
									disabled={
										(selectedPaymentCategory.type === 'cash' &&
											(!price || price < payment.total)) ||
										selectedPayment.length === 0
									}
									onClick={handleMakePayment}
									fullWidth
									className="flex items-center justify-center gap-3 disabled:bg-opacity-70"
								>
									Continue Payment
								</Button>
							</div>
						</div>
					</div>
				</aside>
			</section>
			{dataReceipt && (
				<PrintBillReceipt
					data={dataReceipt}
					printReceiptRef={printReceiptRef}
				/>
			)}
		</Modal>
	);
};

export default CreatePaymentModal;
