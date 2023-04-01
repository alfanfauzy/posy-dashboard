import {Orders} from '@/domain/order/model';
import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetOrdersInput = {transaction_uuid: string};

export type GetOrdersResult = ResultQuery<Orders | undefined>;

// export type GetOrderInput = { product_uuid: string }
// export type GetOrderResult = ResultQuery<Order | undefined>
