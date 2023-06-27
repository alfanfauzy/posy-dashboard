import {Can} from '@/view/auth/components/organisms/rbac';
import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {toRupiah} from '@/view/common/utils/common';
import {Image, Skeleton} from 'antd';
import {Button} from 'posy-fnb-core';
import React, {useContext, useState} from 'react';

import WithdrawConfirmationMolecules from '../../modal/withdraw-confirmation';

const PaymentBalanceMolecules = () => {
	const [isPreviewVisible, setPreviewVisible] = useState(false);

	const {
		paymentBalanceData,
		handleIsOpenFormWithdraw,
		isLoadingPaymentBalance,
	} = useContext(PaymentSettingContext);

	return (
		<section className="h-auto w-auto gap-5 rounded-md border border-gray-200 bg-white p-4 shadow-md mt-4 mb-6">
			<Skeleton loading={isLoadingPaymentBalance}>
				<div className="mb-4 flex flex-start gap-24">
					<section>
						<p className="mb-2 text-m-semibold">Balance</p>
						<p className="text-l-regular">
							{toRupiah(paymentBalanceData?.cash as number)}
						</p>
					</section>
					<section>
						<p className="mb-2 text-m-semibold">Pending settlement</p>
						<p className="text-l-regular text-warning-main">
							{toRupiah(paymentBalanceData?.pending as number)}
						</p>
					</section>
				</div>
				<div className="mb-4 border border-neutral-40"></div>
				<div className="flex justify-between items-center">
					<h4 className="text-m-regular">
						Withdraw process will be charged Rp5.000.{' '}
						<a
							href="#"
							onClick={() => setPreviewVisible(!isPreviewVisible)}
							className="text-[#654DE4] underline cursor-pointer"
						>
							View example
						</a>{' '}
					</h4>
					{isPreviewVisible && (
						<Image
							src="https://i.ibb.co/PDw7ZP0/withdraw-example.png"
							alt="withdraw-example"
							preview={{
								visible: isPreviewVisible,
								onVisibleChange: visible => setPreviewVisible(visible),
							}}
							className="hidden"
						/>
					)}
					<Can I="create_withdrawal" an="payment_integration">
						<Button size="m" onClick={handleIsOpenFormWithdraw}>
							Withdraw
						</Button>
					</Can>
				</div>
			</Skeleton>

			<WithdrawConfirmationMolecules />
		</section>
	);
};

export default PaymentBalanceMolecules;
