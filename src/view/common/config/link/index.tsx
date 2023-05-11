import HistoryIcon from '@/view/common/assets/icons/history';
import ProductIcon from '@/view/common/assets/icons/product';
import ReportIcon from '@/view/common/assets/icons/report';
import SettinsIcon from '@/view/common/assets/icons/settings';
import TransactionIcon from '@/view/common/assets/icons/transaction';

export const PROTECT_ROUTES = [
	{
		title: 'Transaction',
		path: 'transaction',
		icon: <TransactionIcon />,
	},
	{
		title: 'Products',
		path: 'product',
		icon: <ProductIcon />,
	},
	{
		title: 'Report',
		path: 'report',
		icon: <ReportIcon />,
		subMenu: [
			{
				title: 'Report Summary',
				path: 'report/summary',
			},
			{
				title: 'Cancellation Report',
				path: 'report/cancellation',
			},
		],
	},
	{
		title: 'History',
		path: 'history',
		icon: <HistoryIcon />,
	},
	{
		title: 'Settings',
		path: '',
		icon: <SettinsIcon />,
		subMenu: [
			{
				title: 'Tax & Service',
				path: 'settings/tax-and-service',
			},
			{
				title: 'Subscription',
				path: 'settings/subscription',
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
