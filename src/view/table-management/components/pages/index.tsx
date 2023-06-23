import Board from '../organisms/board';
import TableManagementSidebar from '../templates/table-management-sidebar';

const ViewTableManagementPage = () => {
	return (
		<main className="h-full w-full flex gap-2">
			<Board />
			<TableManagementSidebar />
		</main>
	);
};

export default ViewTableManagementPage;
