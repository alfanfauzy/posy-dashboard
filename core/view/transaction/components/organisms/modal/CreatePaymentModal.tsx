import {toRupiah} from '@/utils/common';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React, {useState} from 'react';
import {BsCreditCard} from 'react-icons/bs';
import {FiPrinter} from 'react-icons/fi';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

const PAYMENT_METHOD = [
	{label: 'Cash', value: 'cash'},
	{label: 'Card', value: 'card'},
	{label: 'E-Wallet', value: 'ewallet'},
	{label: 'Bank Tranfer', value: 'bank'},
];

type CreatePaymentModalProps = {
	isOpenCreatePayment: boolean;
	closeCreatePayment: () => void;
	openPaymentConfirmation: () => void;
};

const CreatePaymentModal = ({
	isOpenCreatePayment,
	closeCreatePayment,
	openPaymentConfirmation,
}: CreatePaymentModalProps) => {
	const [selectedPayment, setSelectedPayment] = useState('cash');

	return (
		<Modal
			closeOverlay
			open={isOpenCreatePayment}
			handleClose={closeCreatePayment}
			style={{
				maxWidth: '75%',
				width: '75%',
			}}
			className="!p-0"
		>
			<section className="flex">
				<aside className="flex w-1/3 flex-col items-center rounded-l-3xl bg-neutral-30 p-10">
					<div className="mb-6">
						<p className="text-xxl-semibold">Choose payment method</p>
					</div>
					<div className="flex w-full flex-col gap-4 xl:px-8">
						{PAYMENT_METHOD.map(el => (
							<div
								role="presentation"
								onClick={() => setSelectedPayment(el.value)}
								key={el.label}
								className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
									selectedPayment === el.value
										? 'border-secondary-main bg-[#E0DBFA]'
										: 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-[#E0DBFA] hover:bg-opacity-70'
								}`}
							>
								<BsCreditCard size={24} />
								<p className="text-l-medium">{el.label}</p>
							</div>
						))}
					</div>
					<div className="mt-14 w-full xl:px-8">
						<Button
							fullWidth
							className="flex items-center justify-center gap-3"
						>
							<FiPrinter size={20} />
							Print Bill
						</Button>
					</div>
				</aside>
				<aside className="flex-1 p-10">
					<div className="relative h-full">
						<div className="mb-4 flex items-center gap-2">
							<p className="text-heading-s-regular">Total amount:</p>
							<p className="text-heading-s-bold">Rp510.000</p>
						</div>
						{selectedPayment === 'cash' && (
							<>
								<div className="mt-4">
									<p className="text-xl-semibold">Input Payment Received</p>
									<input
										className="mt-2 flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 p-4 text-center transition-all duration-300 ease-in-out focus:outline-none"
										placeholder="Input custom amount"
										value="Rp 510.000"
									/>
								</div>
								<div className="mt-6 grid w-full grid-cols-2 gap-4">
									{/* <div
        role="presentation"
        // onClick={() => setSelectedPayment(el.value)}
        // key={el.label}
        className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
          selectedPayment !== 'cash'
            ? 'border-secondary-main bg-[#E0DBFA]'
            : 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-[#E0DBFA] hover:bg-opacity-70'
        }`}
      >
        <p className="text-l-medium">{toRupiah(510000)}</p>
      </div> */}
									<div
										role="presentation"
										// onClick={() => setSelectedPayment(el.value)}
										// key={el.label}
										className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
											selectedPayment !== 'cash'
												? 'border-secondary-main bg-[#E0DBFA]'
												: 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-[#E0DBFA] hover:bg-opacity-70'
										}`}
									>
										<p className="text-l-medium">{toRupiah(550000)}</p>
									</div>
									<div
										role="presentation"
										// onClick={() => setSelectedPayment(el.value)}
										// key={el.label}
										className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
											selectedPayment !== 'cash'
												? 'border-secondary-main bg-[#E0DBFA]'
												: 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-[#E0DBFA] hover:bg-opacity-70'
										}`}
									>
										<p className="text-l-medium">{toRupiah(600000)}</p>
									</div>
								</div>

								<div className="mt-4">
									<p className="text-xl-semibold">Change (auto filled)</p>
									<input
										className="mt-2 flex w-full items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 p-4 text-center transition-all duration-300 ease-in-out focus:outline-none disabled:bg-neutral-40"
										disabled
										value={0}
									/>
								</div>
							</>
						)}

						<div className="absolute bottom-0 w-full">
							<div className="bg-slate-200">
								<Button
									onClick={() => {
										closeCreatePayment();
										openPaymentConfirmation();
									}}
									fullWidth
									className="flex items-center justify-center gap-3"
								>
									Continue Payment
								</Button>
							</div>
						</div>
					</div>
				</aside>
			</section>
		</Modal>
	);
};

export default CreatePaymentModal;
