import {Metadata} from '@/domain/vo/BaseMetadata';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type DeleteProductResponse = {uuid: string; metadata: Metadata};

export type DeleteProductResult = ResultMutation<null | undefined>;

export type DeleteProductRepository = {
	deleteProduct(input: string): void;
} & DeleteProductResult;
