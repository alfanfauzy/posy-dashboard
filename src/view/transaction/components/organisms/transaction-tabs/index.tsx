import {Orders} from '@/domain/order/model';
import {useAppSelector} from '@/view/common/store/hooks';
import {TransactionTabsType} from '@/view/common/store/slices/transaction';
import dynamic from 'next/dynamic';

const OrderTabBottom = dynamic(
	() => import('../../molecules/tabs/order/order-tab-bottom'),
	{
		loading: () => <div />,
	},
);
const PaymentTabBottom = dynamic(
	() => import('../../molecules/tabs/payment/payment-tab-bottom'),
	{
		loading: () => <div />,
	},
);

type TransactionTabsProps = {
	dataOrder: Orders | undefined;
};

const TransactionTabs = ({dataOrder}: TransactionTabsProps) => {
	const {transactionTab} = useAppSelector(state => state.transaction);

	const generateBottomTabs = (tab: TransactionTabsType) => {
		const tabs = {
			order: <OrderTabBottom dataOrder={dataOrder} />,
			payment: <PaymentTabBottom />,
		};

		return tabs[tab];
	};

	return (
		<section className="absolute bottom-0 w-full rounded-bl-lg p-4 shadow-basic bg-neutral-10">
			{generateBottomTabs(transactionTab)}
		</section>
	);
};

export default TransactionTabs;
