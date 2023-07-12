import {Area, Areas} from '@/domain/area/model';
import React from 'react';

type FloorListProps = {
	dataArea: Areas;
	selectedArea: Area;
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
					className={`p-2 border flex items-center  gap-1.5 cursor-pointer hover:opacity-70 rounded-t whitespace-nowrap ${
						selectedArea && selectedArea.uuid === area.uuid
							? 'border-secondary-main bg-secondary-border'
							: 'border-neutral-50 bg-neutral-10'
					}`}
				>
					<p>{area.name}</p>
					<div>
						{selectedArea.total_waiting_food &&
						selectedArea.total_waiting_food > 0 ? (
							<div className="w-5 h-5 flex items-center text-xs justify-center bg-secondary-main rounded-full text-white">
								{selectedArea.total_waiting_food}
							</div>
						) : null}
					</div>
				</div>
			))}
		</aside>
	);
};

export default FloorList;
