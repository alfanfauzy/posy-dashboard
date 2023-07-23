import {Area, Areas} from '@/domain/area/model';
import React from 'react';

type FloorListProps = {
	dataArea: Areas;
	selectedArea: Area | null;
	onChangeSelectArea: (val: Area) => void;
};

const FloorList = ({
	dataArea,
	onChangeSelectArea,
	selectedArea,
}: FloorListProps) => {
	return (
		<aside className="absolute flex gap-2 bottom-0 overflow-x-auto w-full pr-10">
			{dataArea.map(area => (
				<div
					key={area.uuid}
					onClick={() => onChangeSelectArea(area)}
					className={`px-2 py-1 border flex items-center cursor-pointer hover:opacity-70 rounded-t whitespace-nowrap ${
						selectedArea && selectedArea.uuid === area.uuid
							? 'border-secondary-main bg-secondary-border'
							: 'border-neutral-50 bg-neutral-10'
					}`}
				>
					<p>{area.name}</p>
					<div>
						{area?.total_waiting_food && area?.total_waiting_food > 0 ? (
							<div className="w-4 h-4 ml-1.5 flex items-center text-xs justify-center bg-secondary-main rounded-full text-white">
								{area?.total_waiting_food}
							</div>
						) : null}
					</div>
				</div>
			))}
		</aside>
	);
};

export default FloorList;
