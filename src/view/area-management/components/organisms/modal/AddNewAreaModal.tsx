import {
	ValidationSchemaCreateAreaType,
	validationSchemaCreateArea,
} from '@/view/area-management/schemas/create-area';
import {useCreateAreaViewModel} from '@/view/area-management/view-models/CreateAreaViewModel';
import {useGetAreaSizesViewModel} from '@/view/area-management/view-models/GetAreaSizesViewModel';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {Modal} from 'antd';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useMemo} from 'react';
import {Controller} from 'react-hook-form';
import {BsEye} from 'react-icons/bs';

const OptionsTableSmallArea = new Array(30).fill(undefined).map((_, index) => ({
	label: String(index + 1),
	value: String(index + 1),
}));

const OptionsTableLargeArea = new Array(48).fill(undefined).map((_, index) => ({
	label: String(index + 1),
	value: String(index + 1),
}));

type Item = {
	label: string;
	value: string;
};

type AddNewAreaModalProps = {
	close: () => void;
	isOpen: boolean;
};

const AddNewAreaModal = ({close, isOpen}: AddNewAreaModalProps) => {
	const {outletId} = useAppSelector(state => state.auth);
	const {data: dataAreaSizes, isLoading: loadAreaSizes} =
		useGetAreaSizesViewModel({
			type: 'GRID',
		});

	const memoDataAreaSizes = useMemo(() => {
		if (dataAreaSizes) {
			return dataAreaSizes.map(item => ({
				label: item.name,
				value: item.uuid,
			}));
		}
		return [];
	}, [dataAreaSizes]);

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		reset,
		control,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaCreateArea,
		defaultValues: {
			restaurant_outlet_uuid: outletId,
		},
	});

	const onClose = () => {
		reset();
		close();
	};

	const {createArea, isLoading: loadCreateArea} = useCreateAreaViewModel({
		onSuccess: () => {
			onClose();
		},
	});

	const onSubmit = (form: ValidationSchemaCreateAreaType) => {
		createArea({
			...form,
			total_table: Number(form.total_table),
			floor_size_uuid: form.floor_size_uuid.value,
		});
	};

	return (
		<Modal
			onCancel={onClose}
			closable={false}
			footer={null}
			width={450}
			open={isOpen}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-4 h-full px-4 p-6 bg-gradient-to-r from-primary-main to-secondary-main rounded-t-lg items-center justify-center">
					<div>
						<p className="text-neutral-10 text-l-semibold">Create New Area</p>
					</div>
					<div className="w-full flex flex-col gap-4">
						<div>
							<span className="mb-1 text-neutral-10 text-m-regular">
								Area name
							</span>
							<Input
								fullwidth
								{...register('name')}
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						</div>
						<aside className="w-full flex gap-2">
							<div className="w-1/2">
								<span className="mb-1 text-neutral-10 text-m-regular">
									Area size
								</span>
								<Controller
									name="floor_size_uuid"
									control={control}
									render={() => (
										<Select
											placeholder="Select area"
											isLoading={loadAreaSizes}
											// value={{label: value, value}}
											options={memoDataAreaSizes}
											className="w-full"
											onChange={v =>
												setValue('floor_size_uuid', v, {
													shouldValidate: true,
												})
											}
											error={!!errors.floor_size_uuid}
											helperText={errors.floor_size_uuid?.message}
										/>
									)}
								/>
							</div>
							<div className="w-1/2">
								<span className="mb-1 text-neutral-10 text-m-regular">
									Area table
								</span>
								<Controller
									name="total_table"
									control={control}
									render={() => (
										<Select
											//value={{label: value, value}}
											placeholder="Select table"
											options={
												getValues('floor_size_uuid')?.label ===
												'Large (up to 48 table)'
													? OptionsTableLargeArea
													: OptionsTableSmallArea
											}
											className="w-full"
											disabled={!getValues('floor_size_uuid')}
											onChange={v =>
												setValue('total_table', (v as Item).value, {
													shouldValidate: true,
												})
											}
											error={!!errors.total_table}
											helperText={errors.total_table?.message}
										/>
									)}
								/>
							</div>
						</aside>
					</div>
					<div className="flex items-center gap-2">
						<BsEye size={16} className="text-neutral-10" />
						<p className="text-m-medium text-neutral-10">View example</p>
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
							isLoading={loadCreateArea}
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

export default AddNewAreaModal;
