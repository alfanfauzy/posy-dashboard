import dynamic from 'next/dynamic';
import {Tabs} from 'posy-fnb-core';
import React, {useState} from 'react';

const PaymentOptionsTable = dynamic(() => import('../table'));

const Item = [
	{key: 'pos', label: 'POS'},
	{key: 'digital-menu', label: 'Digital Menu'},
];

export type TypePayment = 'digital-menu' | 'pos';

const PaymentOptionForm = () => {
	const [tabsVal, setTabsVal] = useState(0);

	const generateTable = (selectVal: number) => {
		const tablePayment: Record<number, JSX.Element> = {
			0: <PaymentOptionsTable type="pos" />,
			1: <PaymentOptionsTable type="digital-menu" />,
		};

		return tablePayment[selectVal];
	};

	return (
		<div className="pt-5">
			<h1 className="mb-4 text-l-bold">Payment Options</h1>
			<Tabs value={tabsVal} items={Item} onChange={e => setTabsVal(e)} />

			{generateTable(tabsVal)}
		</div>
	);
};

export default PaymentOptionForm;
