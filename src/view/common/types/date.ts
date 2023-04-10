import {Range} from 'react-date-range';

export type Dates = {
	startDate: Date;
	endDate: Date;
	key: string;
} & Omit<Range, 'startDate' | 'endDate' | 'key'>;
