import {Can} from '@/view/auth/components/organisms/rbac';
import {Button} from 'posy-fnb-core';
import React from 'react';
import {AiOutlinePercentage} from 'react-icons/ai';

const TableManagementSidebar = () => {
	return (
		<main className="relative w-full flex-1 h-full rounded-l-lg bg-neutral-10">
			{/* {loadTransaction && (
				<div className="flex h-full w-full items-center justify-center">
					<Loading size={75} />
				</div>
			)} */}

			<article className="flex h-full flex-col">
				<section className="p-4">test</section>
				<section className="absolute bottom-0 w-full rounded-bl-lg p-4 shadow-basic bg-neutral-10">
					<div className="flex gap-2">
						<Button
							variant="secondary"
							// onClick={openApplyDiscount}
							// className={`${
							// 	discount_percentage > 0 ? 'bg-secondary-border' : ''
							// }`}
						>
							<div className="rounded-full border-[1.5px] border-neutral-90 p-0.5">
								<AiOutlinePercentage />
							</div>
						</Button>
						<Can I="payment" an="transaction">
							<Button
								variant="primary"
								fullWidth
								// onClick={openCreatePayment}
								className="whitespace-nowrap text-m-semibold"
							>
								Save
							</Button>
						</Can>
					</div>
				</section>
			</article>
		</main>
	);
};

export default TableManagementSidebar;
