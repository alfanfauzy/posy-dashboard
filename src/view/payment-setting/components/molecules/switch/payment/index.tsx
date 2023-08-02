import {PaymentMethodBased} from '@/domain/payment/models';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useUpdatePaymentMethodCategoryByRestaurantViewModal} from '@/view/payment-setting/view-models/UpdatePaymentMethodCategoryByRestaurantViewModel';
import {useQueryClient} from '@tanstack/react-query';
import {useSnackbar} from 'notistack';
import {Toggle} from 'posy-fnb-core';
import React from 'react';

import {TypePayment} from '../../../organism/payment-options';

type MoleculesSwitchProps = {
	data: boolean;
	item: PaymentMethodBased;
	type: TypePayment;
};

const MoleculesSwitchStatusPaymentMethod = ({
	item,
	data,
	type,
}: MoleculesSwitchProps) => {
	const queryClient = useQueryClient();
	const {enqueueSnackbar} = useSnackbar();

	const [statusValue, {toggle: toggleSwitch}] = useDisclosure({
		initialState: data,
	});

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
			payment_method_uuid: item.uuid,
			payload: {
				field: type,
				status: checked,
			},
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
