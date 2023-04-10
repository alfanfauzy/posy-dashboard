export type AddonVariant = {
	variant_uuid: string;
	variant_name: string;
	variant_priority: number;
	variant_price?: number;
};

type AddonBased = {
	uuid: string;
	addon_name: string;
	addon_price: number;
	is_optional: boolean;
	can_choose_multiple: boolean;
	min_variant: number;
	max_variant: number;
	variants: Array<AddonVariant>;
};

export type Addon = AddonBased;
export type Addons = Array<AddonBased>;
