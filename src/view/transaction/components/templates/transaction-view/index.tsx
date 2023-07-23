import {Transactions} from '@/domain/transaction/model';
import {useGetAreasViewModel} from '@/view/area-management/view-models/GetAreasViewModel';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeSelectedArea} from '@/view/common/store/slices/transaction';
import FloorList from '@/view/table-management/components/molecules/floor-list';
import dynamic from 'next/dynamic';
import React from 'react';

const TableView = dynamic(() => import('../../organisms/views/table-view'), {
	loading: () => <div />,
});

const GridView = dynamic(() => import('../../organisms/views/grid-view'), {
	loading: () => <div />,
});

type TransactionViewProps = {
	dataTransaction: Transactions | undefined;
	loadTransaction: boolean;
	loadCreateTransaction: boolean;
	handleCreateTransaction: (outletId: string) => void;
};

const TransactionView = ({
	dataTransaction,
	loadTransaction,
	handleCreateTransaction,
	loadCreateTransaction,
}: TransactionViewProps) => {
	const dispatch = useAppDispatch();
	const {viewType, selectedArea} = useAppSelector(state => state.transaction);
	const {outletId} = useAppSelector(state => state.auth);

	const {data: dataArea} = useGetAreasViewModel(
		{
			restaurant_outlet_uuid: outletId,
			show_waiting_food: true,
		},
		{
			onSuccess: dt => {
				const area = dt?.data?.objs?.find(
					item => item.uuid === selectedArea?.uuid,
				);
				if (area) {
					dispatch(onChangeSelectedArea(area));
				} else if (dt.data.objs?.length > 0) {
					dispatch(onChangeSelectedArea(dt.data.objs[0]));
				}
			},
		},
	);

	const ViewTypes: Record<string, JSX.Element> = {
		table: <TableView />,
		transaction: (
			<GridView
				data={dataTransaction}
				isLoading={loadTransaction}
				handleCreateTransaction={handleCreateTransaction}
				loadCreateTransaction={loadCreateTransaction}
			/>
		),
	};

	return (
		<>
			{ViewTypes[viewType]}
			{viewType === 'table' ? (
				<FloorList
					dataArea={dataArea || []}
					selectedArea={selectedArea}
					onChangeSelectArea={val => dispatch(onChangeSelectedArea(val))}
				/>
			) : null}
		</>
	);
};

export default TransactionView;
