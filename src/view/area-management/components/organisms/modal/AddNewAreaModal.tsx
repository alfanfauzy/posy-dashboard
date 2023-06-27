import {Modal} from 'antd';
import {Button, Input, Select} from 'posy-fnb-core';
import React from 'react';
import {BsEye} from 'react-icons/bs';

type AddNewAreaModalProps = {
	close: () => void;
	isOpen: boolean;
};

const AddNewAreaModal = ({close, isOpen}: AddNewAreaModalProps) => {
	return (
		<Modal
			onCancel={close}
			closable={false}
			footer={null}
			width={352}
			open={isOpen}
		>
			<section className="flex flex-col gap-4 h-full px-4 p-6 bg-gradient-to-r from-primary-main to-secondary-main rounded-t-lg items-center justify-center">
				<div>
					<p className="text-neutral-10 text-l-semibold">Create New Area</p>
				</div>
				<div className="w-full flex flex-col gap-4">
					<div>
						<span className="mb-1 text-neutral-10 text-m-regular">
							Area name
						</span>
						<Input fullwidth />
					</div>
					<aside className="w-full flex gap-2">
						<div className="w-1/2">
							<span className="mb-1 text-neutral-10 text-m-regular">
								Area size
							</span>
							<Select options={[]} className="w-full" />
						</div>
						<div className="w-1/2">
							<span className="mb-1 text-neutral-10 text-m-regular">
								Area table
							</span>
							<Select options={[]} />
						</div>
					</aside>
				</div>
				<div className="flex items-center gap-2">
					<BsEye size={16} className="text-neutral-10" />
					<p className="text-m-medium text-neutral-10">View example</p>
				</div>
			</section>
			<section className="p-4 rounded-b-lg bg-neutral-10 w-full flex gap-3">
				<div className="w-1/2">
					<Button size="m" variant="secondary" fullWidth onClick={close}>
						Cancel
					</Button>
				</div>
				<div className="w-1/2">
					<Button size="m" fullWidth>
						Save
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default AddNewAreaModal;
