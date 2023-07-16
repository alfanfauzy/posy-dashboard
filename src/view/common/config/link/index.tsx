import {Subjects} from '@/view/auth/types';
import HistoryIcon from '@/view/common/assets/icons/history';
import ProductIcon from '@/view/common/assets/icons/product';
import ReportIcon from '@/view/common/assets/icons/report';
import SettinsIcon from '@/view/common/assets/icons/settings';
import TransactionIcon from '@/view/common/assets/icons/transaction';

type ProtectRoutesType = Array<{
	title: string;
	path: string;
	icon: JSX.Element;
	permission: Array<Subjects>;
	subMenu?: Array<{title: string; path: string; permission: Array<Subjects>}>;
}>;

export const PROTECT_ROUTES: ProtectRoutesType = [
	{
		title: 'Transaction',
		path: 'transaction',
		icon: <TransactionIcon />,
		permission: ['transaction'],
	},
	{
		title: 'Products',
		path: 'product',
		icon: <ProductIcon />,
		permission: ['product_outlet'],
	},
	{
		title: 'Report',
		path: 'report',
		icon: <ReportIcon />,
		permission: ['transaction_report'],
		subMenu: [
			{
				title: 'Report Summary',
				path: 'report/summary',
				permission: ['transaction_report'],
			},
			{
				title: 'Cancellation Report',
				path: 'report/cancellation',
				permission: ['transaction_report'],
			},
		],
	},
	{
		title: 'History',
		path: 'history',
		icon: <HistoryIcon />,
		permission: ['transaction_history'],
	},
	{
		title: 'Settings',
		path: '',
		icon: <SettinsIcon />,
		permission: [
			'setting_subscription',
			'setting_tax_service',
			'payment_integration',
		],
		subMenu: [
			{
				title: 'Payment Integration',
				path: 'settings/payment',
				permission: ['payment_integration'],
			},
			{
				title: 'Tax & Services',
				path: 'settings/tax-and-service',
				permission: ['setting_tax_service'],
			},
			{
				title: 'Subscription',
				path: 'settings/subscription',
				permission: ['setting_subscription'],
			},
			{
				title: 'Food Ratings',
				path: 'settings/food-ratings',
				permission: ['setting_subscription'],
			},
		],
	},
];

export const UNPROTECT_ROUTES = [
	'/settings/subscription',
	'/auth/login',
	'/auth/forget-password',
	'/auth/create-new-password',
	'/auth/verify-account',
];
