import {GetFilterPaymentMethod} from '@/domain/payment/repositories/GetPaymentMethodRepository';
import {Search} from '@/domain/vo/BaseInput';

import {TypePayment} from '../../payment-options';

export const queryParams = (type: TypePayment): GetFilterPaymentMethod => {
	const searchParam: Array<
		Search<'is_integration' | 'is_show' | 'show_for_pos' | 'show_for_dm'>
	> = [
		{field: 'is_integration', value: 'true'},
		{field: 'is_show', value: 'true'},
	];

	if (type === 'pos') {
		searchParam.push({field: 'show_for_pos', value: 'true'});
	} else {
		searchParam.push({field: 'show_for_dm', value: 'true'});
	}

	return {
		search: searchParam,
		sort: {field: 'created_at', value: 'desc'},
		page: 1,
		limit: 10,
	};
};
