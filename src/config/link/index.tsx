import HistoryIcon from 'src/assets/icons/history'
import ProductIcon from 'src/assets/icons/product'
import ReportIcon from 'src/assets/icons/report'
import SettinsIcon from 'src/assets/icons/settings'
import TransactionIcon from 'src/assets/icons/transaction'

export const links = [
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
        path: '/settings/tax-and-service',
      },
      {
        title: 'Subscription',
        path: '/settings/subscription',
      },
    ],
  },
]
