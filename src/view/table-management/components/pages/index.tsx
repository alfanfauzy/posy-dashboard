import {useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {TutorialApp} from './TutorialApp';

const ViewTableManagementPage = () => {
	// const [tables, setTables] = useState([
	// 	{x: 5, y: 0},
	// 	{x: 0, y: 4},
	// 	{x: 2, y: 3},
	// ]);

	// const renderSquare = (i: number) => {
	// 	const x = i % 8;
	// 	const y = Math.floor(i / 8);

	// 	return (
	// 		<div
	// 			key={i}
	// 			className="w-32 h-24 border flex items-center justify-center"
	// 		>
	// 			<BoardSquare x={x} y={y} tables={tables} setTables={setTables}>
	// 				{tables.map((table, key) => {
	// 					if (table.x === x && table.y === y) {
	// 						return <Table key={key} />;
	// 					}
	// 				})}
	// 			</BoardSquare>
	// 		</div>
	// 	);
	// };

	// const squares = Array.from(new Array(64), (element, index) =>
	// 	renderSquare(index),
	// );

	return (
		<main className="flex h-full w-full bg-slate-100 p-4">
			{/* <DndProvider backend={HTML5Backend}> */}
			{/* <div className="grid grid-cols-8 overflow-auto">{squares}</div> */}
			<TutorialApp />
			{/* </DndProvider> */}
		</main>
	);
};

export default ViewTableManagementPage;
