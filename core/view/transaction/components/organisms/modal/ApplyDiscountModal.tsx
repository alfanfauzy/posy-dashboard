import {toRupiah} from '@/utils/common';
import dynamic from 'next/dynamic';
import {Button, Input} from 'posy-fnb-core';
import React from 'react';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

type ApplyDiscountModalProps = {
	isOpenApplyDiscount: boolean;
	closeApplyDiscount: () => void;
};

const ApplyDiscountModal = ({
	closeApplyDiscount,
	isOpenApplyDiscount,
}: ApplyDiscountModalProps) => {
	return (
		<Modal
			closeOverlay
			open={isOpenApplyDiscount}
			handleClose={closeApplyDiscount}
			className="min-w-[340px] p-8"
		>
			<section>
				<aside>
					<p className="mb-2 text-l-semibold">Discount</p>
					<Input labelText="Price" disabled value={toRupiah(200000)} />
					<div className="mt-2 flex gap-4">
						<div className="w-2/5">
							<Input
								fullwidth
								labelText="Discount (%)"
								placeholder="0"
								type="number"
							/>
						</div>
						<div className="w-3/5">
							<Input
								fullwidth
								labelText="Discount (Rp)"
								placeholder="0"
								type="number"
							/>
						</div>
					</div>
				</aside>

				<div className="mt-10 flex items-center justify-center gap-4">
					<Button
						variant="secondary"
						className="w-1/2"
						onClick={closeApplyDiscount}
					>
						Close
					</Button>
					<Button className="w-1/2" onClick={closeApplyDiscount}>
						Apply
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default ApplyDiscountModal;
