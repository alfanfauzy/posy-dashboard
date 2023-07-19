import {Area, Areas} from '@/domain/area/model';
import {Transactions} from '@/domain/transaction/model';
import React from 'react';

import GridView from '../../organisms/views/grid-view';
import TableView from '../../organisms/views/table-view';

type TransactionViewProps = {
	dataTransaction: Transactions | undefined;
	loadTransaction: boolean;
	closeNotifBar: () => void;
	loadCreateTransaction: boolean;
	handleCreateTransaction: (outletId: string) => void;
	dataArea: Areas | undefined;
	selectedArea: Area | undefined;
	onChangeSelectArea: (val: Area) => void;
	viewType: string;
};

const TransactionView = ({
	dataTransaction,
	loadTransaction,
	closeNotifBar,
	handleCreateTransaction,
	loadCreateTransaction,
	dataArea,
	onChangeSelectArea,
	selectedArea,
	viewType,
}: TransactionViewProps) => {
	switch (viewType) {
		case 'table':
			return (
				<TableView
					onChangeSelectArea={onChangeSelectArea}
					selectedArea={selectedArea}
					dataArea={dataArea}
				/>
			);

		case 'transaction':
			return (
				<GridView
					data={dataTransaction}
					isLoading={loadTransaction}
					closeNotifBar={closeNotifBar}
					handleCreateTransaction={handleCreateTransaction}
					loadCreateTransaction={loadCreateTransaction}
				/>
			);
		default:
			return (
				<GridView
					data={dataTransaction}
					isLoading={loadTransaction}
					closeNotifBar={closeNotifBar}
					handleCreateTransaction={handleCreateTransaction}
					loadCreateTransaction={loadCreateTransaction}
				/>
			);
	}
};

export default TransactionView;
