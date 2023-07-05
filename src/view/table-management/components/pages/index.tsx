import useDisclosure from '@/view/common/hooks/useDisclosure';
import dynamic from 'next/dynamic';

import Board from '../organisms/board';
import TableManagementSidebar from '../templates/table-management-sidebar';

const AddTableModal = dynamic(
	() => import('../organisms/modal/AddTableModal'),
	{
		loading: () => <div />,
	},
);

const ViewTableManagementPage = () => {
	const [isEditLayout, {open: openEditLayout, close: closeEditLayout}] =
		useDisclosure({initialState: false});

	const [isOpenAddTable, {open: openAddTable, close: closeAddTable}] =
		useDisclosure({initialState: false});

	console.log(isOpenAddTable);
	return (
		<>
			{isOpenAddTable && (
				<AddTableModal isOpen={isOpenAddTable} onClose={closeAddTable} />
			)}
			<main className="h-full w-full flex gap-2">
				<Board
					isEditLayout={isEditLayout}
					closeEditLayout={closeEditLayout}
					openEditLayout={openEditLayout}
					openAddTable={openAddTable}
				/>
				<TableManagementSidebar />
			</main>
		</>
	);
};

export default ViewTableManagementPage;
