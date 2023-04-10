import ArrowDownIcon from '@/view/common/assets/icons/arrowDown';
import {Dates} from '@/view/common/types/date';
import {defaultStaticRanges} from '@/view/common/utils/date';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {addYears} from 'date-fns';
import isEqual from 'lodash.isequal';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import React, {useEffect, useState} from 'react';
import {DateRangePicker} from 'react-date-range';

const Modal = dynamic(() => import('posy-fnb-core').then(el => el.Modal), {
	loading: () => <div />,
});

export const checkLabelColor = (date: Dates) => {
	const element = document.getElementsByClassName('rdrStaticRange');
	defaultStaticRanges.filter((el, idx) =>
		isEqual(
			dateFormatter(date.startDate || 0),
			dateFormatter(el.range().startDate),
		) &&
		isEqual(dateFormatter(date.endDate || 0), dateFormatter(el.range().endDate))
			? element[idx]?.classList?.add('text-s-semibold')
			: element[idx]?.classList?.remove('text-s-semibold'),
	);
};

type DatepickerProps = {
	dateProps: Array<Dates>;
	handleChange: (item: Dates) => void;
	open: () => void;
	close: () => void;
	isOpen: boolean;
};

const Datepicker: React.FC<DatepickerProps> = ({
	dateProps,
	handleChange,
	open,
	close,
	isOpen,
}) => {
	const [date, setDate] = useState(dateProps);

	const onChange = (item: {selection: Dates}) => {
		setDate([item.selection]);
		checkLabelColor(item.selection);
	};

	const onApply = () => {
		handleChange(date[0]);
		close();
	};

	const onCancel = () => {
		setDate(dateProps);
		close();
	};

	useEffect(() => {
		checkLabelColor(date[0]);
	}, [date, isOpen]);

	return (
		<>
			<div
				role="presentation"
				onClick={open}
				className="flex h-8 w-[330px] cursor-pointer items-center justify-between whitespace-nowrap rounded-full border border-neutral-40 px-3 text-m-medium placeholder:text-neutral-80 hover:border-neutral-100 focus:outline-none"
			>
				<p>
					{isEqual(
						dateFormatter(dateProps[0].startDate || 0),
						dateFormatter(dateProps[0].endDate || 0),
					)
						? dateFormatter(dateProps[0].startDate || 0)
						: `${dateFormatter(dateProps[0].startDate || 0)} - ${dateFormatter(
								dateProps[0].endDate || 0,
						  )}`}
				</p>
				<ArrowDownIcon />
			</div>

			<Modal
				className="!p-0"
				open={isOpen}
				handleClose={close}
				confirmButton={
					<div className="mx-4 flex w-full items-center justify-center gap-4">
						<Button variant="secondary" onClick={onCancel} fullWidth>
							Cancel
						</Button>
						<Button variant="primary" onClick={onApply} fullWidth>
							Apply
						</Button>
					</div>
				}
			>
				<section className="p-10 text-primary-main">
					<DateRangePicker
						className="w-full"
						data-testid="content-input"
						minDate={addYears(new Date(), -5)}
						maxDate={new Date()}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						onChange={(e: any) => onChange(e)}
						showMonthAndYearPickers
						color="#E0DBFA"
						rangeColors={['#E0DBFA', '#8772B0']}
						retainEndDateOnFirstSelection={false}
						months={1}
						ranges={date}
						direction="horizontal"
						showDateDisplay
						inputRanges={[]}
						staticRanges={defaultStaticRanges}
					/>
				</section>
			</Modal>
		</>
	);
};

export default Datepicker;
