import {PayloadMasterProduct} from '@/domain/product/model/MasterProduct';
import {
	MenuProductBased,
	MenuProducts,
} from '@/domain/product/model/ProductMenu';
import {
	Product,
	ProductMaster,
	Products,
} from '@/domain/product/model/ProductOutlet';
import {
	UpdateOutletProduct,
	UpdateOutletProductDefaultInput,
	UpdateOutletProductInput,
} from '@/domain/product/repositories/UpdateOutletProductRepository';
import {UpdateOutletProductStatus} from '@/domain/product/repositories/UpdateOutletProductStatusRepository';
import {ValidationSchemaMasterProductType} from '@/view/product/schemas/product-master';
import {ValidationSchemaProductOutletType} from '@/view/product/schemas/update-product';

import {GetMenuProductsDataResponse} from '../types/GetMenuProductsType';
import {GetMenuProductDataResponse} from '../types/GetMenuProductType';
import {
	GetDetailProductResponse,
	GetListProductDataResponse,
} from '../types/MasterProduct';
import {
	GetOutletProductDataResponse,
	GetOutletProductsDataResponse,
	UpdateOutletProductStatusDataResponse,
} from '../types/OutletProduct';

// map server data to own model
// export const mapToMenuProductsModel = (
// 	datas: Array<GetMenuProductsDataResponse>,
// ): Products => {
// 	const newData: Products = [];
// 	datas.forEach(el => {
// 		el.products.forEach(product => {
// 			newData[product.uuid as any] = product;
// 		});
// 	});

// 	for (const key in newData) {
// 		const product = newData[key];
// 		newData.push(product);
// 	}

// 	return newData;
// };

export const mapToMenuProductsModel = (
	datas: Array<GetMenuProductsDataResponse>,
): MenuProducts => {
	const newData = {
		category_name: 'All',
		category_uuid: 'all',
		products: datas.flatMap(el => el.products),
	};
	return [newData, ...datas].map(el => ({
		category_name: el.category_name,
		category_uuid: el.category_uuid,
		products: el.products,
	}));
};

export const mapToMenuProductModel = (
	data: GetMenuProductDataResponse,
): Product => ({
	uuid: data.detail.product.uuid,
	product_name: data.detail.product.product_name,
	product_image_url: data.detail.product.product_image_url,
	product_description: data.detail.product.product_description,
	price_final: data.detail.price_final,
	price_discount_percentage: data.detail.price_discount_percentage,
	price_after_discount: data.detail.price_after_discount,
	price_discount: data.detail.price_discount,
	price: data.detail.price,
	is_favourite: data.detail.is_favourite,
	is_discount: data.detail.is_discount,
	is_available: data.detail.is_available,
	cooking_duration: data.detail.cooking_duration,
	categories: data.detail.product.categories,
	addons: data.addons.map(el => ({
		uuid: el.uuid,
		addon_price: el.addon_price,
		addon_name: el.addon_name,
		can_choose_multiple: el.can_choose_multiple,
		is_optional: el.is_optional,
		max_variant: el.max_variant,
		min_variant: el.min_variant,
		variants: el.variants.map(variant => ({
			variant_uuid: variant.uuid,
			variant_name: variant.variant_name,
			variant_priority: variant.variant_priority,
			variant_price: variant?.variant_price || 0,
		})),
	})),
	is_show: data.detail.is_show,
});

export const mapToOutletProductsModel = (
	datas: Array<GetOutletProductsDataResponse>,
): Products =>
	datas.map(data => ({
		uuid: data.product.uuid,
		product_name: data.product.product_name,
		product_image_url: data.product.product_image_url,
		product_description: data.product.product_description,
		price: data.price,
		price_final: data.price_final,
		price_discount_percentage: data.price_discount_percentage,
		price_after_discount: data.price_after_discount,
		price_discount: data.price_discount,
		is_favourite: data.is_favourite,
		is_discount: data.is_discount,
		is_available: data.is_available,
		cooking_duration: data.cooking_duration,
		categories: data.product.categories,
		is_show: data.is_show,
	}));

export const mapToUpdateOutletProductStatusModel = (
	data: UpdateOutletProductStatusDataResponse,
): UpdateOutletProductStatus => ({
	success: data.success,
	metadata: {
		updated_at: data.metadata.updated_at.seconds,
	},
});

export const mapToOutletProductModel = (
	data: GetOutletProductDataResponse,
): Product => ({
	uuid: data.detail.product.uuid,
	product_name: data.detail.product.product_name,
	product_image_url: data.detail.product.product_image_url,
	product_description: data.detail.product.product_description,
	price_final: data.detail.price_final,
	price_discount_percentage: data.detail.price_discount_percentage,
	price_after_discount: data.detail.price_after_discount,
	price_discount: data.detail.price_discount,
	price: data.detail.price,
	is_favourite: data.detail.is_favourite,
	is_discount: data.detail.is_discount,
	is_available: data.detail.is_available,
	cooking_duration: data.detail.cooking_duration,
	categories: data.detail.product.categories,
	addons: data.addons.map(el => ({
		uuid: el.uuid,
		addon_name: el.addon_name,
		addon_price: el.addon_price,
		can_choose_multiple: el.can_choose_multiple,
		is_optional: el.is_optional,
		max_variant: el.max_variant,
		min_variant: el.min_variant,
		variants: el.variants.map(variant => ({
			variant_uuid: variant.uuid,
			variant_name: variant.variant_name,
			variant_priority: variant.variant_priority,
			variant_price: variant?.variant_price || 0,
		})),
	})),
	is_show: data.detail.is_show,
});

export const mapToUpdateOutletProductModel = (
	data: UpdateOutletProductStatusDataResponse,
): UpdateOutletProduct => ({
	success: data.success,
	metadata: {
		updated_at: data.metadata.updated_at.seconds,
	},
});

export const mapToUpdateOutletProductPayload = (
	data: ValidationSchemaProductOutletType,
	default_input: UpdateOutletProductDefaultInput,
): UpdateOutletProductInput => ({
	restaurant_outlet_uuid: default_input.restaurant_outlet_uuid,
	product_uuid: default_input.product_uuid,
	price: parseInt(data.price.split('.').join('')),
	price_after_discount: data.price_after_discount
		? parseInt(data.price_after_discount.split('.').join(''))
		: 0,
	is_show: data.is_show,
	is_favourite: data.is_favourite,
	is_available: data.is_available,
	addons: data.addon.map(addon => ({
		addon_name: addon.addon_name,
		can_choose_multiple: addon.can_choose_multiple,
		is_optional: !addon.is_required,
		variants: addon.addon_variants.map(variant => ({
			variant_name: variant.variant_name,
			variant_price: parseInt(variant.variant_price.split('.').join('')),
		})),
	})),
	cooking_duration: data.cooking_duration ? parseInt(data.cooking_duration) : 0,
});

export const mapProductMenuToProductOutletModel = (
	prd: MenuProductBased,
): Product => ({
	uuid: prd.uuid,
	product_name: prd.product_name,
	price: prd.price,
	price_final: prd.price_final,
	price_discount: prd.price_discount,
	is_available: prd.is_available,
	cooking_duration: prd.cooking_duration,
	is_discount: prd.is_discount,
	is_favourite: prd.is_favourite,
	price_after_discount: prd.price_after_discount,
	product_image_url: prd.product_image_url,
	product_description: prd.product_description,
	price_discount_percentage: prd.price_discount_percentage,
	categories: prd.categories,
	addons: [],
	is_show: true,
});

export const mapToMasterProductModel = (
	datas: Array<GetListProductDataResponse>,
): Products =>
	datas.map(data => ({
		uuid: data.uuid,
		product_name: data.product_name,
		restaurant_uuid: data.restaurant_uuid,
		product_description: data.product_description,
		product_image: data.product_image,
		product_image_url: data.product_image_url,
		is_favourite: data.is_favourite,
		is_discount: data.is_discount,
		cooking_duration: data.cooking_duration,
		price: data.price,
		price_after_discount: data.price_after_discount,
		price_discount: data.price_discount,
		price_discount_percentage: data.price_discount_percentage,
		price_final: data.price_final,
		seconds: data.metadata.created_at.seconds,
		categories: data.categories.map(category => ({
			uuid: category.uuid,
			category_name: category.category_name,
			is_active: category.is_active,
		})),
		restaurant_outlets: data.restaurant_outlets?.map(outlet => ({
			value: outlet.uuid,
			label: outlet.name,
		})),
		is_available: data.is_available,
		is_show: data.is_show,
	}));

export const mapToMasterProductDetailModel = (
	data: GetDetailProductResponse,
): Product => ({
	uuid: data.product.uuid,
	product_name: data.product.product_name,
	product_image_url: data.product.product_image_url,
	product_description: data.product.product_description,
	price_final: data.product.price_final,
	price_discount_percentage: data.product.price_discount_percentage,
	price_after_discount: data.product.price_after_discount,
	price_discount: data.product.price_discount,
	price: data.product.price,
	is_favourite: data.product.is_favourite,
	is_discount: data.product.is_discount,
	is_available: data.product.is_available,
	cooking_duration: data.product.cooking_duration,
	categories: data.product.categories,
	addons: data.addons?.map(el => ({
		uuid: el.uuid,
		addon_price: el.max_variant,
		addon_name: el.addon_name,
		can_choose_multiple: el.can_choose_multiple,
		is_optional: el.is_optional,
		max_variant: el.max_variant,
		min_variant: el.min_variant,
		variants: el.variants.map(variant => ({
			variant_uuid: variant.uuid,
			variant_name: variant.variant_name,
			variant_priority: variant.variant_priority,
			variant_price: variant?.variant_price || 0,
		})),
	})),
	is_show: data.product.is_show,
});

export const mapToPayloadMasterProduct = (
	data: ValidationSchemaMasterProductType,
): PayloadMasterProduct => ({
	product_name: data.product_name,
	cooking_duration: Number(data.cooking_duration) ?? 0,
	is_available: data.is_available,
	is_favourite: data.is_favourite,
	is_show: data.is_show,
	price: Number(data.price.split('.').join('')),
	price_after_discount: Number(data.price_after_discount),
	product_description: data.product_description as string,
	product_image_url: data.product_image_url as string,
	category_uuids: data.category_uuids.map(category => category.value),
	restaurant_outlet_uuids: data.restaurant_outlet_uuids.map(
		outlet => outlet.value,
	),
	addons:
		data.addon?.map(data => ({
			addon_name: data.addon_name,
			can_choose_multiple: data.can_choose_multiple,
			is_optional: data.is_optional,
			priority: Number(data.addon_priority),
			variants:
				data.variants.map(variant => ({
					variant_name: variant.variant_name,
					variant_price: Number(variant.variant_price.split('.').join('')),
					variant_priority: variant.variant_priority,
				})) ?? [],
		})) ?? [],
});

export const mapToDetailProductModel = (
	datas: GetDetailProductResponse,
): ProductMaster => ({
	uuid: datas.product.uuid,
	product_name: datas.product.product_name,
	product_image_url: datas.product.product_image_url,
	product_description: datas.product.product_description,
	price_final: datas.product.price_final,
	price_discount_percentage: datas.product.price_discount_percentage,
	price_after_discount: datas.product.price_after_discount,
	price_discount: datas.product.price_discount,
	price: datas.product.price,
	is_favourite: datas.product.is_favourite,
	is_discount: datas.product.is_discount,
	is_available: datas.product.is_available,
	cooking_duration: datas.product.cooking_duration,
	restaurant_outlets: datas.product.restaurant_outlets?.map(outlet => ({
		value: outlet.uuid,
		label: outlet.name,
	})),
	categories: datas.product.categories?.map(category => ({
		value: category.uuid,
		label: category.category_name,
	})),
	addons: datas.addons?.map(el => ({
		uuid: el.uuid,
		addon_name: el.addon_name,
		can_choose_multiple: el.can_choose_multiple,
		is_optional: el.is_optional,
		max_variant: el.max_variant,
		min_variant: el.min_variant,
		variants: el.variants.map(variant => ({
			variant_uuid: variant.uuid,
			variant_name: variant.variant_name,
			variant_priority: variant.variant_priority,
			variant_price: variant?.variant_price || 0,
		})),
	})),
	is_show: datas.product.is_show,
});
