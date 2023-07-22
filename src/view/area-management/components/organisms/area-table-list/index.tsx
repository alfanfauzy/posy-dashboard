import {Area} from '@/domain/area/model';
import {ValidationSchemaEditTableAreaType} from '@/view/area-management/schemas/editTableArea';
import {getMaxTable} from '@/view/area-management/utils/getMaxTable';
import {SelectedArea} from '@/view/common/store/slices/area';
import {tableTypeOptions} from '@/view/table-management/constants';
import EmptyArea from '@/view/transaction/components/molecules/empty-state/empty-area';
import {Divider} from 'antd';
import {Input, Loading, Select} from 'posy-fnb-core';
import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {CgTrash} from 'react-icons/cg';

type AreaTableListProps = {
	isLoading: boolean;
	isFetching: boolean;
	selectedArea: SelectedArea;
	data: Area | undefined;
	onOpenDeleteTable: (idx: number) => void;
};

const AreaTableList = ({
	isLoading,
	selectedArea,
	isFetching,
	data,
	onOpenDeleteTable,
}: AreaTableListProps) => {
	const {
		getValues,
		register,
		control,
		formState: {errors},
	} = useFormContext<ValidationSchemaEditTableAreaType>();

	const {append, update} = useFieldArray({
		control,
		name: 'table_list',
	});

	const canAddTable =
		getValues('table_list')?.length > 0 &&
		getValues('table_list')?.length < getMaxTable(data?.floor_size_name || '');

	const isAreaEmpty =
		(!selectedArea.name || getValues('table_list')?.length === 0) &&
		!isFetching;

	return (
		<section className="overflow-y-auto flex h-full flex-col">
			{isLoading && selectedArea?.uuid ? (
				<div className="flex justify-center items-center my-20">
					<Loading size={80} />
				</div>
			) : null}

			{isAreaEmpty ? <EmptyArea /> : null}

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
										helperText={errors.table_list?.[idx]?.table_number?.message}
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
										onClick={() => onOpenDeleteTable(idx)}
									/>
								</div>
							</div>
							<Divider className="mb-4" />
						</aside>
					))}
					{canAddTable ? (
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
	);
};

export default AreaTableList;
