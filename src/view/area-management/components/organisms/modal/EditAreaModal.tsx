import {
	ValidationSchemaEditAreaType,
	validationSchemaEditArea,
} from '@/view/area-management/schemas/editArea';
import {useGetAreaSizesViewModel} from '@/view/area-management/view-models/GetAreaSizesViewModel';
import {useUpdateAreaViewModel} from '@/view/area-management/view-models/UpdateAreaViewModel';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {Modal} from 'antd';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useEffect, useMemo} from 'react';

import PreviewTable from '../../molecules/preview-table';

const OptionsTableSmallArea = new Array(30).fill(undefined).map((_, index) => ({
	label: String(index + 1),
	value: String(index + 1),
}));

type EditAreaModalProps = {
	close: () => void;
	isOpen: boolean;
};

const EditAreaModal = ({close, isOpen}: EditAreaModalProps) => {
	const {
		auth: {outletId},
		area: {selectedArea},
	} = useAppSelector(state => state);

	const [isShowPreview, {open: openPreview, close: closePreview}] =
		useDisclosure({
			initialState: false,
		});

	const {data: dataAreaSizes, isLoading: loadAreaSizes} =
		useGetAreaSizesViewModel(
			{
				type: 'GRID',
			},
			{
				enabled: isOpen,
			},
		);

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
		reset,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaEditArea,
		defaultValues: {
			restaurant_outlet_uuid: outletId,
		},
	});

	const onClose = () => {
		reset();
		close();
	};

	const {UpdateArea, isLoading: loadUpdateArea} = useUpdateAreaViewModel({
		onSuccess: () => {
			onClose();
		},
	});

	const onSubmit = (form: ValidationSchemaEditAreaType) => {
		if (selectedArea) {
			UpdateArea({...form, floor_area_uuid: selectedArea?.uuid});
		}
	};

	useEffect(() => {
		if (selectedArea) {
			reset({
				name: selectedArea.name,
				restaurant_outlet_uuid: outletId,
			});
		}
	}, [outletId, reset, selectedArea]);

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
						<p className="text-neutral-10 text-l-semibold">Edit Area</p>
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

								<Select
									disabled
									placeholder="Select area"
									isLoading={loadAreaSizes}
									value={{
										label: selectedArea?.size || '',
										value: selectedArea?.size || '',
									}}
									options={memoDataAreaSizes}
									className="w-full"
								/>
							</div>
							<div className="w-1/2">
								<span className="mb-1 text-neutral-10 text-m-regular">
									Total table
								</span>
								<Select
									value={{
										label: selectedArea?.table || '',
										value: selectedArea?.table || '',
									}}
									placeholder="Select table"
									options={OptionsTableSmallArea}
									className="w-full"
									disabled
								/>
							</div>
						</aside>
					</div>
					{selectedArea.size && (
						<PreviewTable
							closePreview={closePreview}
							openPreview={openPreview}
							isShowPreview={isShowPreview}
							size={selectedArea.size}
						/>
					)}
				</div>
				<section className="p-4 rounded-b-lg bg-neutral-10 w-full flex gap-3">
					<div className="w-1/2">
						<Button
							type="button"
							size="m"
							variant="secondary"
							fullWidth
							onClick={onClose}
						>
							Cancel
						</Button>
					</div>
					<div className="w-1/2">
						<Button
							type="submit"
							isLoading={loadUpdateArea}
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

export default EditAreaModal;
