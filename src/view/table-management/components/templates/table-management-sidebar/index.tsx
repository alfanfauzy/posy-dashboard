import {Can} from '@/view/auth/components/organisms/rbac';
import TableIcon from '@/view/common/assets/icons/tableIcon';
import {Button, Input, Select} from 'posy-fnb-core';
import React from 'react';
import {CgTrash} from 'react-icons/cg';

export const tableTypeOptions = [
	{
		label: '2 Seats',
		value: '2',
	},
	{
		label: '4 Seats',
		value: '4',
	},
	{
		label: '6 Seats',
		value: '6',
	},
	{
		label: '8 Seats',
		value: '8',
	},
];

const TableManagementSidebar = () => {
	return (
		<main className="relative w-full flex-1 h-full rounded-l-lg bg-neutral-10">
			{/* {loadTransaction && (
				<div className="flex h-full w-full items-center justify-center">
					<Loading size={75} />
				</div>
			)} */}

			<article className="flex h-full flex-col">
				<section>
					<aside className="p-4 bg-gradient-to-r from-primary-main to-secondary-main rounded-l-lg">
						<div className="flex items-center justify-between">
							<p className="text-l-bold text-neutral-10">Table Details</p>

							<CgTrash className="cursor-pointer text-neutral-10" size={20} />
						</div>
					</aside>
				</section>
				{/* <section className="-mt-16 h-full flex flex-col items-center justify-center">
					<TableIcon />
					<p className="mt-4 text-l-medium text-neutral-90">
						Select one of table beside
					</p>
				</section> */}

				<section className="p-4">
					<div className="mt-2 flex flex-col gap-4">
						<Input labelText="Table name" />
						<Select options={tableTypeOptions} labelText="Table type" />
					</div>
				</section>

				<section className="absolute bottom-0 w-full rounded-bl-lg p-4 shadow-basic bg-neutral-10">
					<div className="flex gap-2">
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
