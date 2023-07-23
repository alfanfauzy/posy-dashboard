import {TableLayout} from '@/domain/table/model/TableLayout';
import {useAppSelector} from '@/view/common/store/hooks';
import React from 'react';

import TableSquare from '../../molecules/table-square';

type TableSettingBoardProps = {
	tablePos: TableLayout;
	setTablePos: (tablePos: TableLayout) => void;
};

const TableSettingBoard = ({tablePos, setTablePos}: TableSettingBoardProps) => {
	const {selectedArea, isEditLayout} = useAppSelector(state => state.table);

	return (
		<aside className="flex w-full h-full pb-20 overflow-y-auto">
			<div className="bg-[#F7F7F7] h-fit w-full p-2 mt-4">
				{selectedArea ? (
					<div
						className={`w-full h-fit border-[0.5px] border-neutral-40 grid grid-cols-${selectedArea.width} `}
					>
						{new Array(selectedArea?.height * selectedArea?.width)
							.fill(0)
							.map((_, index) =>
								TableSquare({
									index,
									tablePos,
									setTablePos,
									selectedArea,
									isEditLayout,
								}),
							)}
					</div>
				) : null}
			</div>
		</aside>
	);
};

export default TableSettingBoard;
