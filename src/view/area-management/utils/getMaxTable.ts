export const getMaxTable = (area_table: string) => {
	const maxTableLg = 'Large (up to 48 table)';
	const maxTableSm = 'Small (up to 30 table)';

	const maxTable: Record<string, number> = {
		[maxTableLg]: 48,
		[maxTableSm]: 30,
	};

	return maxTable[area_table];
};
