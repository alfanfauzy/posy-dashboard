import {PaymentMethodBased} from '@/domain/payment/models';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useUpdatePaymentMethodCategoryByRestaurantViewModal} from '@/view/payment-setting/view-models/UpdatePaymentMethodCategoryByRestaurantViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useSnackbar} from 'notistack';
import {Toggle} from 'posy-fnb-core';
import React from 'react';

type MoleculesSwitchProps = {
	data: boolean;
	item: PaymentMethodBased;
};

const MoleculesSwitchStatusPaymentMethod = ({
	data,
	item,
}: MoleculesSwitchProps) => {
	const {query} = useRouter();
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();
	const {restaurantID} = query;

	const [statusValue, {toggle: toggleSwitch}] = useDisclosure({
		initialState: data,
	});
	useDisclosure;

	const {updatePaymentMethodCategory} =
		useUpdatePaymentMethodCategoryByRestaurantViewModal({
			onSuccess() {
				toggleSwitch();
				enqueueSnackbar({
					message: 'Sucessfully update payment method',
					variant: 'success',
				});
				queryClient.invalidateQueries(['payment-method/list']);
			},
		});

	const handleCheckedChange = async (checked: boolean) => {
		const payload = {
			restaurant_uuid: restaurantID,
			payment_method_category: [
				{
					uuid: item.payment_method_category_uuid,
					is_show: true,
					payment_method: [
						{
							uuid: item.uuid,
							is_show: checked,
						},
					],
				},
			],
		};

		updatePaymentMethodCategory(payload);
	};

	return (
		<Toggle
			value={statusValue}
			onChange={() => handleCheckedChange(!statusValue)}
		/>
	);
};

export default MoleculesSwitchStatusPaymentMethod;
