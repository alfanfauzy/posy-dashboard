import {mapToAreaModel} from '@/data/area/mappers/AreaMapper';
import {
	ValidationSchemaEditTableAreaType,
	validationSchemaEditTableArea,
} from '@/view/area-management/schemas/editTableArea';
import {useGetAreaViewModel} from '@/view/area-management/view-models/GetAreaViewModel';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeArea,
	onChangeToggleDeleteArea,
	onChangeToggleEditArea,
} from '@/view/common/store/slices/area';
import {useUpdateBulkTableByFloorViewModel} from '@/view/table-management/view-models/UpdateBulkTableByFloorViewModel';
import {Button} from 'posy-fnb-core';
import React, {useEffect, useState} from 'react';
import {FormProvider, useFieldArray} from 'react-hook-form';
import {CgTrash} from 'react-icons/cg';
import {HiOutlinePencilAlt} from 'react-icons/hi';

import AreaTableList from '../../organisms/area-table-list';
import DeleteTableModal from '../../organisms/modal/DeleteTableModal';

const AreaDetails = () => {
	const {
		auth: {outletId},
		area: {selectedArea},
	} = useAppSelector(state => state);
	const dispatch = useAppDispatch();

	const [openDeleteTable, setOpenDeleteTable] = useState({
		isOpen: false,
		payload: 0,
	});

	const methods = useForm({
		mode: 'onChange',
		schema: validationSchemaEditTableArea,
	});

	const {
		handleSubmit,
		reset,
		control,
		formState: {isValid},
	} = methods;

	const {remove} = useFieldArray({
		control,
		name: 'table_list',
	});

	const {data, isLoading, isFetching} = useGetAreaViewModel(
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
					const defaultArea = {
						name: mappedDataArea?.name,
						uuid: mappedDataArea?.uuid,
						size: mappedDataArea?.floor_size_name,
						table: mappedDataArea?.total_table?.toString(),
					};
					dispatch(onChangeArea(defaultArea));
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

	const onDeleteTable = () => {
		remove(openDeleteTable.payload);
		setOpenDeleteTable({isOpen: false, payload: 0});
	};

	const onOpenDeleteTable = (idx: number) => {
		setOpenDeleteTable({
			isOpen: true,
			payload: idx,
		});
	};

	useEffect(() => {
		if (!selectedArea.uuid) {
			reset({
				floor_area_uuid: '',
				table_list: [],
			});
		}
	}, [reset, selectedArea]);

	return (
		<>
			{openDeleteTable.isOpen ? (
				<DeleteTableModal
					isOpen={openDeleteTable.isOpen}
					close={() => setOpenDeleteTable({isOpen: false, payload: 0})}
					onDelete={onDeleteTable}
				/>
			) : null}
			<FormProvider {...methods}>
				<section className="h-full flex-1 flex flex-col gap-4 overflow-y-hidden overflow-auto p-4 xl:rounded-r-lg rounded-lg bg-neutral-10">
					<form onSubmit={handleSubmit(onSubmit)} className="relative h-full">
						<aside className="h-[92%] border border-neutral-40 rounded-lg flex flex-col">
							<div className="flex justify-between items-center px-6 py-2 bg-neutral-20 border-b border-b-neutral-40 rounded-t-lg">
								<p className="text-l-semibold text-neutral-90">
									Area details {data ? `- ${data?.floor_size_name}` : null}
								</p>

								{selectedArea.uuid ? (
									<div className="flex gap-8">
										<HiOutlinePencilAlt
											onClick={() => dispatch(onChangeToggleEditArea(true))}
											size={20}
											className="cursor-pointer text-neutral-70 hover:opacity-80"
										/>
										<CgTrash
											onClick={() => dispatch(onChangeToggleDeleteArea(true))}
											className="cursor-pointer text-neutral-70 hover:opacity-80"
											size={20}
										/>
									</div>
								) : null}
							</div>
							<AreaTableList
								data={data}
								isFetching={isFetching}
								isLoading={isLoading}
								selectedArea={selectedArea}
								onOpenDeleteTable={onOpenDeleteTable}
							/>
						</aside>

						<div className="absolute bottom-0 w-full">
							<Button
								size="m"
								fullWidth
								disabled={!isValid || !selectedArea.uuid}
								isLoading={loadUpdateBulk}
							>
								Save
							</Button>
						</div>
					</form>
				</section>
			</FormProvider>
		</>
	);
};

export default AreaDetails;
