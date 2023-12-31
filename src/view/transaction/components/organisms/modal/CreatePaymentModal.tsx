import {GetTableLayoutByFloorQueryKey} from '@/data/table/sources/GetTableLayoutByFloorQuery';
import {GetTransactionsQueryKey} from '@/data/transaction/sources/GetTransactionsQuery';
import {GetTransactionSummaryQueryKey} from '@/data/transaction/sources/GetTransactionSummaryQuery';
import {MakePayment} from '@/domain/transaction/repositories/CreateMakePaymentRepository';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeIsOpenCreatePayment,
	onChangePayment,
	onChangePaymentSuccess,
} from '@/view/common/store/slices/transaction';
import {toRupiah} from '@/view/common/utils/common';
import {generateSuggestionAmount} from '@/view/common/utils/UtilsGenerateSuggestionAmount';
import {useGetOrdersViewModel} from '@/view/order/view-models/GetOrdersViewModel';
import {useGetPaymentMethodCategoriesViewModel} from '@/view/payment-method/view-models/GetPaymentMethodCategoriesViewModel';
import {useGetPaymentMethodsViewModel} from '@/view/payment-method/view-models/GetPaymentMethodsViewModel';
import {useCreateMakePaymentViewModel} from '@/view/transaction/view-models/CreateMakePaymentViewModel';
import {useCreatePrintReceiptViewModel} from '@/view/transaction/view-models/CreatePrintReceiptViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {Modal} from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {Button, Loading} from 'posy-fnb-core';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FiPrinter} from 'react-icons/fi';
import {NumericFormat} from 'react-number-format';
import {useReactToPrint} from 'react-to-print';

const PrintBillReceipt = dynamic(() => import('../receipt/PrintBillReceipt'), {
	loading: () => <div />,
});

const PaymentConfirmationModal = dynamic(
	() => import('./PaymentConfirmationModal'),
	{
		loading: () => <div />,
	},
);

const PaymentSuccessModal = dynamic(() => import('./PaymentSuccessModal'), {
	loading: () => <div />,
});

const CreatePaymentModal = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const printReceiptRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
	const {outletId} = useAppSelector(state => state.auth);
	const {payment, selectedTrxId, isOpenCreatePayment, paymentSuccess} =
		useAppSelector(state => state.transaction);
	const [selectedPaymentCategory, setSelectedPaymentCategory] = useState({
		type: '',
		uuid: '',
	});
	const [selectedPayment, setSelectedPayment] = useState('');
	const [additionalInfo, setAdditionalInfo] = useState('');
	const [price, setPrice] = useState(0);

	const [openConfirmation, setOpenConfirmation] = useState(false);

	const suggestionAmount = useMemo(
		() => generateSuggestionAmount(payment.total || 0),
		[payment],
	);

	useEffect(() => {
		setPrice(payment.total);
	}, [payment]);

	const handleCloseCreatePayment = () => {
		dispatch(onChangeIsOpenCreatePayment(false));
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

	const {
		data: dataPaymentMethodCategories,
		isLoading: loadPaymentMethodCategories,
	} = useGetPaymentMethodCategoriesViewModel(
		{
			sort: {field: 'created_at', value: 'asc'},
			search: [{field: 'is_integration', value: 'false'}],
			page: 1,
			limit: 50,
		},
		{
			onSuccess: dtPaymentCategories => {
				if (dtPaymentCategories.data.objs) {
					setSelectedPaymentCategory({
						type: 'cash',
						uuid: dtPaymentCategories.data.objs[0].uuid,
					});
				}
			},
		},
	);

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
				onSuccess: dtPaymentMethods => {
					if (dtPaymentMethods.data.objs) {
						setSelectedPayment(dtPaymentMethods.data.objs[0].uuid);
					}
				},
			},
		);

	const {makePayment, isLoading} = useCreateMakePaymentViewModel({
		onSuccess: _data => {
			const data = _data as MakePayment;
			if (data) {
				queryClient.invalidateQueries([GetTransactionsQueryKey]);
				queryClient.invalidateQueries([GetTransactionSummaryQueryKey]);
				queryClient.invalidateQueries([GetTableLayoutByFloorQueryKey]);
				handleCloseCreatePayment();
				setOpenConfirmation(false);
				dispatch(
					onChangePaymentSuccess({
						isOpen: true,
						payload: data,
					}),
				);
			}
		},
	});

	const {data: dataOrder} = useGetOrdersViewModel(
		{
			transaction_uuid: selectedTrxId || '',
		},
		{enabled: !!selectedTrxId},
	);

	const ListStatusOrder = useMemo(
		() => dataOrder?.map(data => Number(data.status)),
		[dataOrder],
	);

	const statusOrder = [1, 2, 4];

	const isNeedShowModal = statusOrder.some(value =>
		ListStatusOrder?.includes(value),
	);

	const submitPayment = () => {
		makePayment({
			transaction_uuid: selectedTrxId,
			restaurant_outlet_uuid: outletId,
			payment_method_uuid: selectedPayment,
			pay_amount: price,
			additional_info: additionalInfo,
		});
	};

	const handleMakePayment = () => {
		if (isNeedShowModal) {
			setOpenConfirmation(true);
			return;
		}

		submitPayment();
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

	return (
		<>
			<Modal
				open={isOpenCreatePayment}
				onCancel={handleCloseCreatePayment}
				closable={false}
				footer={null}
				width={900}
				style={{
					top: 40,
				}}
			>
				<section className="flex h-full">
					<aside className="flex flex-col w-1/3 h-full overflow-auto items-center rounded-l-3xl bg-neutral-30 py-6">
						<div className="mb-4">
							<p className="text-xxl-semibold">Choose payment method</p>
						</div>
						{loadPaymentMethodCategories && (
							<div className="min-h-[380px] flex items-center">
								<Loading size={75} />
							</div>
						)}
						{!loadPaymentMethodCategories && dataPaymentMethodCategories && (
							<>
								<div className="flex w-full flex-col gap-4 px-8">
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
													className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border px-4 py-2.5 transition-all duration-300 ease-in-out hover:opacity-70 ${
														selectedPaymentCategory.type ===
														el.name.toLowerCase()
															? 'border-secondary-main bg-secondary-border'
															: 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-secondary-border hover:bg-opacity-70'
													}`}
												>
													<Image
														alt={el.name}
														width={24}
														height={24}
														src={el.logo_url}
														priority
													/>
													<p className="text-m-medium">{el.name}</p>
												</div>
											),
									)}
								</div>

								<div className="mt-14 w-full px-8">
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

					<aside className="flex-1 p-6">
						<div className="relative h-full">
							<div className="mb-4 flex items-center gap-2">
								<p className="text-xxl-regular">Total amount:</p>
								<p className="text-xxl-bold">{toRupiah(payment.total)}</p>
							</div>
							{selectedPaymentCategory.type === 'cash' && (
								<>
									<div className="mt-4">
										<p className="text-l-semibold">Input Payment Received</p>
										<NumericFormat
											className="mt-2 flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 px-4 py-2.5 text-center transition-all duration-300 ease-in-out focus:outline-none"
											thousandSeparator="."
											decimalSeparator=","
											prefix="Rp "
											onValueChange={(e: any) => setPrice(e.floatValue)}
											allowNegative={false}
											value={price}
										/>
									</div>
									<div className="mt-4 grid w-full grid-cols-2 gap-4">
										{suggestionAmount.slice(1).map(el => (
											<div
												key={el}
												role="presentation"
												onClick={() => setPrice(el)}
												className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border px-4 py-2.5 transition-all duration-300 ease-in-out hover:opacity-70 ${
													selectedPaymentCategory.type !== 'cash'
														? 'border-secondary-main bg-secondary-border'
														: 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-secondary-border hover:bg-opacity-70'
												}`}
											>
												<p className="text-m-medium">{toRupiah(el)}</p>
											</div>
										))}
									</div>

									<div className="mt-4">
										<p className="text-l-semibold">Change (auto filled)</p>
										<input
											className="mt-2 flex w-full items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 px-4 py-2.5 text-m-medium text-center transition-all duration-300 ease-in-out focus:outline-none disabled:bg-neutral-40"
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

							{selectedPaymentCategory.type !== 'cash' &&
								dataPaymentMethods && (
									<aside className="grid grid-cols-4 gap-2">
										{dataPaymentMethods.map(
											paymentMethod =>
												paymentMethod.is_show && (
													<div
														onClick={() =>
															setSelectedPayment(paymentMethod.uuid)
														}
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
												),
										)}
									</aside>
								)}

							<div className="absolute bottom-0 w-full">
								{(selectedPaymentCategory.type === 'card' ||
									selectedPaymentCategory.type === 'bank transfer') && (
									<div className="mt-4 mb-7">
										<p className="text-l-semibold">Trace number (Optional)</p>
										<input
											onChange={e => setAdditionalInfo(e.target.value)}
											className="mt-2 flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 px-4 py-2.5 text-center transition-all duration-300 ease-in-out focus:outline-none text-m-medium"
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
			</Modal>
			{dataReceipt && (
				<PrintBillReceipt
					data={dataReceipt}
					printReceiptRef={printReceiptRef}
				/>
			)}

			{openConfirmation && (
				<PaymentConfirmationModal
					isOpen={openConfirmation}
					close={() => setOpenConfirmation(false)}
					submit={submitPayment}
					loading={isLoading}
				/>
			)}
			{paymentSuccess?.isOpen && <PaymentSuccessModal />}
		</>
	);
};

export default CreatePaymentModal;
