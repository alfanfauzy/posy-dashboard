import {Table} from '@/domain/table/model';
import {Can} from '@/view/auth/components/organisms/rbac';
import TableIcon from '@/view/common/assets/icons/tableIcon';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {
	ValidationSchemaAddTableType,
	validationSchemaAddTable,
} from '@/view/table-management/schemas/addTableSchema';
import {useCreateUpsertTableViewModel} from '@/view/table-management/view-models/CreateUpsertTableViewModel';
import dynamic from 'next/dynamic';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useEffect} from 'react';
import {CgTrash} from 'react-icons/cg';

const DeleteTableModal = dynamic(
	() => import('../../organisms/modal/DeleteTableModal'),
	{
		loading: () => <div />,
	},
);

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

type TableManagementSidebarProps = {
	selectedTable: Table | null;
	onChangeSelectedTable: (val: null) => void;
};

const TableManagementSidebar = ({
	selectedTable,
	onChangeSelectedTable,
}: TableManagementSidebarProps) => {
	const {outletId} = useAppSelector(state => state.auth);

	const [isOpenDeleteTable, {open: openDeleteTable, close: closeDeleteTable}] =
		useDisclosure({
			initialState: false,
		});

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: {errors, isValid},
	} = useForm({
		mode: 'onChange',
		schema: validationSchemaAddTable,
	});

	const {CreateUpsertTable, isLoading} = useCreateUpsertTableViewModel({
		onSuccess: () => {
			reset();
			onChangeSelectedTable(null);
		},
	});

	const onSubmit = (form: ValidationSchemaAddTableType) => {
		CreateUpsertTable({...form, restaurant_outlet_uuid: outletId});
	};

	useEffect(() => {
		if (selectedTable) {
			reset(selectedTable);
		}
	}, [reset, selectedTable]);

	return (
		<>
			{selectedTable && (
				<DeleteTableModal
					isOpen={isOpenDeleteTable}
					close={closeDeleteTable}
					selectedTable={selectedTable}
					onSelectTable={onChangeSelectedTable}
				/>
			)}
			<main className="relative w-full flex-1 h-full rounded-l-lg bg-neutral-10">
				<aside className="flex h-full flex-col">
					<section>
						<aside className="p-4 bg-gradient-to-r from-primary-main to-secondary-main rounded-l-lg">
							<div className="flex items-center justify-between">
								<p className="text-l-bold text-neutral-10">Table Details</p>

								{selectedTable && (
									<CgTrash
										onClick={openDeleteTable}
										className="cursor-pointer text-neutral-10"
										size={20}
									/>
								)}
							</div>
						</aside>
					</section>

					{!selectedTable ? (
						<div className="flex flex-col gap-4 justify-center items-center h-full">
							<TableIcon />
							<span className="text-m-medium">Select one of table beside</span>
						</div>
					) : (
						<form onSubmit={handleSubmit(onSubmit)}>
							<section className="p-4">
								<div className="mt-2 flex flex-col gap-4">
									<Input
										{...register('table_number')}
										labelText="Table name"
										error={!!errors.table_number}
										helperText={errors.table_number?.message}
									/>
									<Select
										options={tableTypeOptions}
										value={{
											label: `${watch('table_seat')} Seats`,
											value: watch('table_seat'),
										}}
										labelText="Table type"
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
									<Can I="payment" an="transaction">
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
									</Can>
								</div>
							</section>
						</form>
					)}
				</aside>
			</main>
		</>
	);
};

export default TableManagementSidebar;
