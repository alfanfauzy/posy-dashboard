import {TransactionStatus} from '@/domain/transaction/model';
import {Receipt} from '@/domain/transaction/repositories/CreatePrintReceiptRepository';
import {toRupiah} from '@/view/common/utils/common';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {generateTransactionCode} from '@/view/common/utils/UtilsGenerateTransactionCode';
import Image from 'next/image';
import React from 'react';

type PrintBillReceiptProps = {
	data: Receipt;
	printReceiptRef: React.RefObject<HTMLDivElement>;
};

const PrintBillReceipt = ({data, printReceiptRef}: PrintBillReceiptProps) => {
	return (
		<article className="hidden">
			<div
				ref={printReceiptRef}
				className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
			>
				<div className="relative bg-white px-6 pb-14 pt-5 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10">
					<div className="mx-auto max-w-md">
						<div className="flex items-center justify-center pb-4 pt-3">
							<Image
								alt="logo"
								src={data.logo_image_url}
								className="h-20 w-20 rounded-full"
								width={80}
								height={80}
							/>
						</div>
					</div>

					<div className="divide-y border-b border-dashed border-gray-400">
						<div className="mx-auto max-w-md pb-5">
							<p className="text-center text-xxl-bold text-neutral-100">
								{data.restaurant_name}
							</p>
							{/* location  */}
							<p className="text-center text-l-regular text-neutral-100">
								{data.restaurant_code}
							</p>
							{/* location  ^^^^ */}
							<p className="pt-6 text-center text-xl-semibold text-neutral-100">
								{data.transaction_category || '-'} / Table{' '}
								{data.table_number || '-'} / Pax {data.total_pax || '-'}
							</p>
						</div>
					</div>

					<div className="mx-auto max-w-md">
						<div className="mx-auto max-w-md pb-2"></div>
						<div className="border-b border-dashed border-gray-400">
							<div className="flex justify-between pb-2 pt-4">
								<p className="text-m-regular text-neutral-100">Date</p>
								<p className="text-m-regular text-neutral-100">Cashier</p>
							</div>
							<div className="flex justify-between pb-5">
								<p className="text-m-semibold">
									{dateFormatter(data.created_at, 'dd MMM yyyy')}
								</p>
								<p className="text-m-semibold">{data.cashier_by || '-'}</p>
							</div>
							<div className="flex justify-between pb-2 pt-2">
								<p className="text-m-regular text-neutral-100">Trx ID</p>
								<p className="text-m-regular text-neutral-100">Customer name</p>
							</div>
							<div className="flex justify-between pb-4">
								<p className="text-m-semibold">
									{generateTransactionCode(data.transaction_code)}
								</p>
								<p className="text-m-semibold">{data.customer_name || '-'}</p>
							</div>
						</div>

						{data.items.map((item, idx) => (
							<div
								key={item.name}
								className="border-b border-dashed border-gray-400"
							>
								<div className="mx-auto max-w-md pb-2 pt-4">
									<p className="text-left text-m-semibold text-neutral-100">
										{`Order ${idx + 1}`}
									</p>
								</div>
								<div className="flex justify-between pb-2 pt-2">
									<p className="text-m-regular text-neutral-100">{item.name}</p>
									<p className="text-m-regular text-neutral-100">
										{toRupiah(item.price)}
									</p>
								</div>
							</div>
						))}

						<div className="border-b border-dashed border-gray-400">
							<div className="mx-auto max-w-md">
								<div className="mx-auto max-w-md pb-2 pt-4">
									<p className="text-left text-m-semibold text-neutral-100">
										Payment Details
									</p>
								</div>
								<div className="flex justify-between pb-2">
									<p className="text-m-regular">Subtotal</p>
									<p className="text-m-regular">
										{toRupiah(data.payment_summary.subtotal_price)}
									</p>
								</div>
								<div className="flex justify-between pb-2">
									<p className="text-m-regular">Discount</p>
									<p className="text-m-regular">
										{toRupiah(data.payment_summary.discount_general_price)}
									</p>
								</div>
								<div className="flex justify-between pb-2">
									<p className="text-m-regular">Service</p>
									<p className="text-m-regular">
										{toRupiah(
											data.payment_summary.tax_and_charge.service_charge_price,
										)}
									</p>
								</div>
								<div className="flex justify-between pb-2">
									<p className="text-m-regular">PB 1</p>
									<p className="text-m-regular">
										{toRupiah(data.payment_summary.tax_and_charge.tax_price)}
									</p>
								</div>
								<div className="flex justify-between pb-4">
									<p className="text-l-semibold">TOTAL</p>
									<p className="text-l-semibold">
										{toRupiah(data.payment_summary.payment_price)}
									</p>
								</div>
							</div>
						</div>

						{data.status === TransactionStatus.PAID && (
							<div className="divide-y border-b border-dashed border-gray-400">
								<div className="mx-auto max-w-md pb-4 pt-4">
									<p className="text-center text-m-semibold text-neutral-100">
										Closed Bill
									</p>
									<p className="pb-6 text-center text-m-regular text-neutral-100">
										{dateFormatter(data.paid_at, 'dd MMM yyyy - HH:mm')}
									</p>
									<p className="text-center text-m-regular text-neutral-100">
										Thank you for your order!
									</p>
								</div>
							</div>
						)}

						{data.status !== TransactionStatus.PAID && (
							<div className="divide-y border-b border-dashed border-gray-400">
								<div className="mx-auto max-w-md pb-4 pt-4">
									<p className="text-center text-m-semibold text-neutral-100">
										Not Paid
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</article>
	);
};

export default PrintBillReceipt;
