import React from 'react';

type ReportSummaryCardProps = {
	title: string | number;
	value: string;
};

const ReportSummaryCard = ({title, value}: ReportSummaryCardProps) => {
	return (
		<div className="bg-neutral-10 shadow-md border-t-[6px] border-t-secondary-border rounded-t-lg rounded-b-2xl py-4 px-6">
			<p className="text-m-regular">{title}</p>
			<p className="text-xl-bold">{value}</p>
		</div>
	);
};

export default ReportSummaryCard;
