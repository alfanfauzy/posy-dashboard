/* eslint-disable @typescript-eslint/naming-convention */
import {OrderDetailStatus, OrderStatus} from '@/domain/order/model';
import {AiFillPrinter, AiOutlineInfoCircle} from 'react-icons/ai';
import {BsCheckCircleFill} from 'react-icons/bs';
import {MdSoupKitchen} from 'react-icons/md';

export const generateStatusOrder = (status: OrderStatus) => {
	const statusColor = {
		0: 'text-blue-success',
		1: 'text-secondary-main cursor-pointer hover:opacity-70',
		2: 'text-warning-main',
		3: 'text-green-success',
		4: 'text-red-caution',
	};

	const statusText = {
		0: 'Not selected',
		1: 'Need to print',
		2: 'On kitchen',
		3: 'Served',
		4: 'Cancelled',
	};

	const icon = {
		0: <AiOutlineInfoCircle />,
		1: <AiFillPrinter />,
		2: <MdSoupKitchen />,
		3: <BsCheckCircleFill />,
		4: <AiOutlineInfoCircle />,
	};

	return (
		<p
			className={`flex gap-2 items-center text-m-medium ${statusColor[status]}`}
		>
			{icon[status]}
			{statusText[status]}
		</p>
	);
};

export const generateStatusOrderDetail = (status: OrderDetailStatus) => {
	const statusColor = {
		0: 'text-blue-success',
		1: 'text-secondary-main cursor-pointer hover:opacity-70',
		2: 'text-warning-main',
		3: 'text-green-success',
		4: 'text-red-caution',
	};

	const statusText = {
		0: 'Not selected',
		1: 'Need to print',
		2: 'On kitchen',
		3: 'Served',
		4: 'Cancelled',
	};

	const icon = {
		0: <AiOutlineInfoCircle />,
		1: <AiFillPrinter />,
		2: <MdSoupKitchen />,
		3: <BsCheckCircleFill />,
		4: <AiOutlineInfoCircle />,
	};

	return (
		<p className={`flex gap-1 items-center ${statusColor[status]}`}>
			{icon[status]}
			{statusText[status]}
		</p>
	);
};
