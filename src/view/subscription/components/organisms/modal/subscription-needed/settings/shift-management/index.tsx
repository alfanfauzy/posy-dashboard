import {Toggle} from 'posy-fnb-core';
import React from 'react';

const ShiftManagementSettings = () => {
	return (
		<section>
			<h1 className="text-xl-semibold text-neutral-100">Shift Management</h1>
			<div className="mt-4 p-5 rounded-2xl bg-neutral-10 border border-neutral-40 w-full flex justify-between shadow-box-2">
				<span className="text-l-semibold">Activate open shift</span>
				<Toggle value onChange={() => undefined} />
			</div>
		</section>
	);
};

export default ShiftManagementSettings;
