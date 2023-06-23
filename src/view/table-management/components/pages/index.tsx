import TableManagementSidebar from '../templates/table-management-sidebar';
import {Board} from './Board';

const ViewTableManagementPage = () => {
	return (
		<main className="h-full w-full flex gap-2">
			<Board />
			<TableManagementSidebar />
		</main>
	);
};

export default ViewTableManagementPage;
