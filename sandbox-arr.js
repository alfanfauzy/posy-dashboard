const multiArray = [];

const data = [
	{
		rows: [
			{
				table_uuid: 'xxx-xxx-xxx',
				table_number: '1',
				table_seat: 4,
				table_image: 'https://ik.imagekit.io/posyfnb/table_2.png',
				position_x: 1,
				position_y: 0,
			},
			{
				table_uuid: 'xxx-xxx-xxx',
				table_number: '2',
				table_seat: 4,
				table_image: 'https://ik.imagekit.io/posyfnb/table_2.png',
				position_x: 2,
				position_y: 0,
			},
			{
				table_uuid: 'xxx-xxx-xxx',
				table_number: '3',
				table_seat: 4,
				table_image: 'https://ik.imagekit.io/posyfnb/table_2.png',
				position_x: 3,
				position_y: 0,
			},
		],
	},
	{
		rows: [
			{
				table_uuid: 'xxx-xxx-xxx',
				table_number: '2',
				table_seat: 4,
				table_image: 'https://ik.imagekit.io/posyfnb/table_2.png',
				position_x: 0,
				position_y: 1,
			},
			null,
			null,
		],
	},
];

data.forEach(item => {
	const {rows} = item;
	const rowArray = [];

	rows.forEach(row => {
		if (row) {
			rowArray.push(row);
		} else {
			rowArray.push(null);
		}
	});

	multiArray.push(rowArray);
});

// console.log(multiArray);

const convertedArray = [];

multiArray.forEach(row => {
	const newRow = {
		rows: row.map(item => (item ? item : null)),
	};
	convertedArray.push(newRow);
});

console.log(convertedArray);
