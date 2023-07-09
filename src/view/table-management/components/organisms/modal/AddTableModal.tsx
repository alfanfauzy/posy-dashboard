import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {
	ValidationSchemaAddTableType,
	validationSchemaAddTable,
} from '@/view/table-management/schemas/addTableSchema';
import {useCreateUpsertTableViewModel} from '@/view/table-management/view-models/CreateUpsertTableViewModel';
import {Modal} from 'antd';
import {Button, Input, Select} from 'posy-fnb-core';
import React from 'react';

import {tableTypeOptions} from '../../templates/table-management-sidebar';

export type TableProps = {
	position_x: number;
	position_y: number;
	floor_area_uuid: string;
};

type AddTableModalProps = {
	isOpen: boolean;
	onClose: () => void;
	tableProps: TableProps;
};

const AddTableModal = ({isOpen, onClose, tableProps}: AddTableModalProps) => {
	const {outletId} = useAppSelector(state => state.auth);
	const {
		register,
		formState: {errors, isValid},
		reset,
		handleSubmit,
		setValue,
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaAddTable,
		defaultValues: {
			position_x: tableProps.position_y,
			position_y: tableProps.position_x,
			floor_area_uuid: tableProps.floor_area_uuid,
		},
	});

	const {CreateUpsertTable, isLoading} = useCreateUpsertTableViewModel({
		onSuccess: () => {
			reset();
			onClose();
		},
	});

	const onSubmit = (form: ValidationSchemaAddTableType) => {
		CreateUpsertTable({...form, restaurant_outlet_uuid: outletId});
	};

	return (
		<Modal
			onCancel={onClose}
			closable={false}
			footer={null}
			width={380}
			open={isOpen}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-4 h-full px-4 p-6 bg-gradient-to-r from-primary-main to-secondary-main rounded-t-lg items-center justify-center">
					<div>
						<p className="text-neutral-10 text-l-semibold">Add New Table</p>
					</div>
					<div className="w-full flex flex-col gap-4">
						<div>
							<span className="mb-1 text-neutral-10 text-m-regular">
								Table name
							</span>
							<Input
								placeholder="eg. 01"
								{...register('table_number')}
								error={!!errors.table_number}
								helperText={errors.table_number?.message}
							/>
						</div>
						<aside className="w-full flex gap-2">
							<div className="w-full">
								<span className="mb-1 text-neutral-10 text-m-regular">
									Table type
								</span>

								<Select
									placeholder="Select area"
									options={tableTypeOptions}
									className="w-full"
									onChange={v =>
										setValue('table_seat', Number(v.value), {
											shouldValidate: true,
										})
									}
									error={!!errors.table_seat}
									helperText={errors.table_seat?.message}
								/>
							</div>
						</aside>
					</div>
				</div>
				<section className="p-4 rounded-b-lg bg-neutral-10 w-full flex gap-3">
					<div className="w-1/2">
						<Button size="m" variant="secondary" fullWidth onClick={onClose}>
							Cancel
						</Button>
					</div>
					<div className="w-1/2">
						<Button
							type="submit"
							isLoading={isLoading}
							disabled={!isValid}
							size="m"
							fullWidth
						>
							Save
						</Button>
					</div>
				</section>
			</form>
		</Modal>
	);
};

export default AddTableModal;
