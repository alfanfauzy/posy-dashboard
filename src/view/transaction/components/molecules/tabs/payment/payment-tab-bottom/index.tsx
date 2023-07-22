import {Can} from '@/view/auth/components/organisms/rbac';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {
	onChangeIsApplyDiscount,
	onChangeIsOpenCreatePayment,
} from '@/view/common/store/slices/transaction';
import {Button} from 'posy-fnb-core';
import {AiOutlinePercentage} from 'react-icons/ai';

const PaymentTabBottom = () => {
	const dispatch = useAppDispatch();
	const {
		payment: {discount_percentage},
	} = useAppSelector(state => state.transaction);

	const handleCreatePayment = () => dispatch(onChangeIsOpenCreatePayment(true));

	const handleOpenApplyDiscount = () => dispatch(onChangeIsApplyDiscount(true));

	return (
		<div className="flex gap-2">
			<Button
				variant="secondary"
				onClick={handleOpenApplyDiscount}
				className={`${discount_percentage > 0 ? 'bg-secondary-border' : ''}`}
			>
				<div className="rounded-full border-[1.5px] border-neutral-90 p-0.5">
					<AiOutlinePercentage />
				</div>
			</Button>
			<Can I="payment" an="transaction">
				<Button
					variant="primary"
					fullWidth
					onClick={handleCreatePayment}
					className="whitespace-nowrap text-m-semibold"
				>
					Payment
				</Button>
			</Can>
		</div>
	);
};

export default PaymentTabBottom;
