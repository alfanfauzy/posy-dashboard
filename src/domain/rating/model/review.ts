export type ReviewBased = {
	uuid: string;
	food_rating_uuid: string;
	product_uuid: string;
	product_name: string;
	addon_information: Array<AddonInformation>;
	rating: number;
	review: string;
	review_note: string;
};

type AddonInformation = {
	addon_name: string;
	addon_price: number;
	addon_variants: Array<AddonVariant>;
};

type AddonVariant = {
	variant_name: string;
	variant_price: number;
};

export type Reviews = Array<ReviewBased>;
