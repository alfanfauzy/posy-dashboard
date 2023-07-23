import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeSelectedTable} from '@/view/common/store/slices/table';
import {tableTypeOptions} from '@/view/table-management/constants';
import {ValidationSchemaAddTableType} from '@/view/table-management/schemas/addTableSchema';
import {useCreateUpsertTableViewModel} from '@/view/table-management/view-models/CreateUpsertTableViewModel';
import {Button, Input, Select} from 'posy-fnb-core';
import React from 'react';
import {useFormContext} from 'react-hook-form';

const EditTableForm = () => {
	const dispatch = useAppDispatch();
	const {outletId} = useAppSelector(state => state.auth);
	const {
		reset,
		watch,
		register,
		setValue,
		handleSubmit,
		formState: {errors, isValid},
	} = useFormContext<ValidationSchemaAddTableType>();

	const {CreateUpsertTable, isLoading} = useCreateUpsertTableViewModel({
		onSuccess: () => {
			reset();
			dispatch(onChangeSelectedTable(null));
		},
	});

	const onSubmit = (form: ValidationSchemaAddTableType) => {
		CreateUpsertTable({...form, restaurant_outlet_uuid: outletId});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className="p-4">
				<div className="mt-2 flex flex-col gap-4">
					<Input
						labelText="Table name"
						{...register('table_number')}
						error={!!errors.table_number}
						helperText={errors.table_number?.message}
					/>
					<Select
						labelText="Table type"
						options={tableTypeOptions}
						value={{
							label: `${watch('table_seat')} Seats`,
							value: watch('table_seat'),
						}}
						onChange={v =>
							setValue('table_seat', Number(v.value), {
								shouldValidate: true,
							})
						}
						error={!!errors.table_seat}
						helperText={errors.table_seat?.message}
					/>
				</div>
			</section>

			<section className="absolute bottom-0 w-full rounded-bl-lg p-4 shadow-basic bg-neutral-10">
				<div className="flex gap-2">
					<Button
						variant="primary"
						fullWidth
						type="submit"
						disabled={!isValid}
						isLoading={isLoading}
						className="whitespace-nowrap text-m-semibold"
					>
						Save
					</Button>
				</div>
			</section>
		</form>
	);
};

export default EditTableForm;
