import {mapToAreaModel} from '@/data/area/mappers/AreaMapper';
import {
	ValidationSchemaEditTableAreaType,
	validationSchemaEditTableArea,
} from '@/view/area-management/schemas/editTableArea';
import {useGetAreaViewModel} from '@/view/area-management/view-models/GetAreaViewModel';
import AreaIcon from '@/view/common/assets/icons/area';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {tableTypeOptions} from '@/view/table-management/components/templates/table-management-sidebar';
import {useUpdateBulkTableByFloorViewModel} from '@/view/table-management/view-models/UpdateBulkTableByFloorViewModel';
import {Divider} from 'antd';
import {Button, Input, Loading, Select} from 'posy-fnb-core';
import React from 'react';
import {useFieldArray} from 'react-hook-form';
import {AiOutlineEye} from 'react-icons/ai';
import {CgTrash} from 'react-icons/cg';
import {HiOutlinePencilAlt} from 'react-icons/hi';

import {SelectedArea} from '../../templates/area-settings';

type AreaDetailsProps = {
	openDeleteArea: () => void;
	openEditArea: () => void;
	selectedArea: SelectedArea | null;
	onSelectArea: (val: SelectedArea | null) => void;
};

const AreaDetails = ({
	openDeleteArea,
	openEditArea,
	selectedArea,
	onSelectArea,
}: AreaDetailsProps) => {
	const {outletId} = useAppSelector(state => state.auth);

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		control,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaEditTableArea,
	});

	const {update, append, remove} = useFieldArray({
		control,
		name: 'table_list',
	});

	const {data, isLoading} = useGetAreaViewModel(
		{
			restaurant_outlet_uuid: outletId,
			area_uuid: selectedArea?.uuid || '',
			with_table: true,
		},
		{
			enabled: !!selectedArea?.uuid,
			onSuccess: _data => {
				if (_data) {
					const mappedDataArea = mapToAreaModel(_data.data);
					const defaultArea: SelectedArea = {
						name: mappedDataArea?.name,
						uuid: mappedDataArea?.uuid,
						size: mappedDataArea?.floor_size_name,
						table: mappedDataArea?.total_table?.toString(),
					};
					onSelectArea(defaultArea);
					reset({
						floor_area_uuid: defaultArea.uuid,
						table_list: mappedDataArea?.table_list?.map(table => ({
							table_uuid: table.uuid,
							table_seat: table.table_seat?.toString(),
							table_number: table.table_number,
						})),
					});
				}
			},
		},
	);

	const {UpdateBulkTableByFloor, isLoading: loadUpdateBulk} =
		useUpdateBulkTableByFloorViewModel({});

	const onSubmit = (form: ValidationSchemaEditTableAreaType) => {
		UpdateBulkTableByFloor({
			floor_area_uuid: form.floor_area_uuid,
			restaurant_outlet_uuid: outletId,
			tables: form.table_list.map(table => ({
				uuid: table.table_uuid,
				table_number: table.table_number,
				table_seat: Number(table.table_seat),
			})),
		});
	};

	return (
		<section className="h-full flex-1 flex flex-col gap-4 overflow-y-hidden overflow-auto p-4 xl:rounded-r-lg rounded-lg bg-neutral-10">
			<form onSubmit={handleSubmit(onSubmit)} className="relative h-full">
				<aside className="h-[92%] border border-neutral-40 rounded-lg flex flex-col">
					<div className="flex justify-between items-center px-6 py-2 bg-neutral-20 border-b border-b-neutral-40 rounded-t-lg">
						<p className="text-l-semibold text-neutral-90">
							Area details {data ? `- ${data?.name}` : null}
						</p>

						{getValues('table_list')?.length > 0 ? (
							<div className="flex gap-8">
								<AiOutlineEye
									size={20}
									className="cursor-pointer text-neutral-70 hover:opacity-80"
								/>
								<HiOutlinePencilAlt
									onClick={openEditArea}
									size={20}
									className="cursor-pointer text-neutral-70 hover:opacity-80"
								/>
								<CgTrash
									onClick={openDeleteArea}
									className="cursor-pointer text-neutral-70 hover:opacity-80"
									size={20}
								/>
							</div>
						) : null}
					</div>
					<section className="overflow-y-auto flex h-full flex-col">
						{isLoading && selectedArea?.uuid ? (
							<div className="flex justify-center items-center my-20">
								<Loading size={80} />
							</div>
						) : null}

						{!getValues('table_list') ||
						getValues('table_list').length === 0 ? (
							<div className="h-full flex flex-col justify-center items-center">
								<AreaIcon />
								<p className="text-m-medium mt-2">Please add new area first</p>
							</div>
						) : null}

						{getValues('table_list')?.length > 0 && !isLoading ? (
							<div className="pt-6 px-6 h-full overflow-y-auto flex flex-col">
								{getValues('table_list')?.map((table, idx) => (
									<aside key={table.table_uuid}>
										<div className="w-full items-center flex gap-4">
											<div className="w-1/2">
												<Input
													{...register(`table_list.${idx}.table_number`)}
													fullwidth
													labelText="Table name"
													error={!!errors.table_list?.[idx]?.table_number}
													helperText={
														errors.table_list?.[idx]?.table_number?.message
													}
												/>
											</div>
											<div className="w-1/2">
												<Select
													className="!mb-0"
													options={tableTypeOptions}
													labelText="Table seat"
													value={{
														label: table.table_seat
															? `${table.table_seat} seats`
															: 'Select table seat',
														value: table.table_seat,
													}}
													onChange={val =>
														update(idx, {
															table_uuid: table.table_uuid,
															table_number: table.table_number,
															table_seat: val.value,
														})
													}
												/>
											</div>
											<div className="mt-5">
												<CgTrash
													className="cursor-pointer text-neutral-70 hover:opacity-80"
													size={20}
													onClick={() => remove(idx)}
												/>
											</div>
										</div>
										<Divider className="mb-4" />
									</aside>
								))}
								{getValues('table_list')?.length > 0 ? (
									<div className="flex items-center justify-center mb-4">
										<p
											onClick={() =>
												append({
													table_number: '',
													table_seat: '',
													table_uuid: '',
												})
											}
											className="text-secondary-main text-l-semibold cursor-pointer hover:text-opacity-70 duration-300"
										>
											+ Add new table
										</p>
									</div>
								) : null}
							</div>
						) : null}
					</section>
				</aside>

				<div className="absolute bottom-0 w-full">
					<Button
						size="m"
						fullWidth
						disabled={!isValid}
						isLoading={loadUpdateBulk}
					>
						Save
					</Button>
				</div>
			</form>
		</section>
	);
};

export default AreaDetails;
