import TableIcon from '@/view/common/assets/icons/tableIcon';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useForm} from '@/view/common/hooks/useForm';
import {useAppSelector} from '@/view/common/store/hooks';
import {validationSchemaAddTable} from '@/view/table-management/schemas/addTableSchema';
import dynamic from 'next/dynamic';
import React, {useEffect} from 'react';
import {FormProvider} from 'react-hook-form';
import {CgTrash} from 'react-icons/cg';

import EditTableForm from '../../organisms/form/EditTableForm';

const DeleteTableModal = dynamic(
	() => import('../../organisms/modal/DeleteTableModal'),
	{
		loading: () => <div />,
	},
);

const TableDetailSidebar = () => {
	const {selectedTable} = useAppSelector(state => state.table);
	const [isOpenDeleteTable, {open: openDeleteTable, close: closeDeleteTable}] =
		useDisclosure({
			initialState: false,
		});

	const methods = useForm({
		mode: 'onChange',
		schema: validationSchemaAddTable,
	});
	const {reset} = methods;

	useEffect(() => {
		if (selectedTable) {
			reset(selectedTable);
		}
	}, [reset, selectedTable]);

	return (
		<>
			{selectedTable && (
				<DeleteTableModal isOpen={isOpenDeleteTable} close={closeDeleteTable} />
			)}
			<main className="relative w-full max-w-[30%] h-full rounded-l-lg bg-neutral-10">
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
					) : null}

					{selectedTable ? (
						<FormProvider {...methods}>
							<EditTableForm />
						</FormProvider>
					) : null}
				</aside>
			</main>
		</>
	);
};

export default TableDetailSidebar;
