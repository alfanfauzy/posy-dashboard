import {MongoQuery, PureAbility, RawRuleOf} from '@casl/ability';

export type Actions =
	| 'read'
	| 'update'
	| 'all_selection'
	| 'payment'
	| 'create'
	| 'cancel'
	| 'reprint-qrcode'
	| 'as_authorization_user'
	| 'print_to_kitchen'
	| 'change_show_product'
	| 'change_available_product'
	| 'export_excel'
	| 'manage_permission'
	| 'manage_role'
	| 'manage_access_setting'
	| 'create_permission'
	| 'create_withdrawal'
	| 'update_bank'
	| 'create_bank'
	| 'manage_payment_method'
	| 'view';

export type Subjects =
	| 'setting_tax_service'
	| 'outlet'
	| 'setting_subscription'
	| 'transaction'
	| 'refund'
	| 'order'
	| 'product_outlet'
	| 'transaction_report'
	| 'transaction_history'
	| 'role'
	| 'payment_integration'
	| 'food_rating';

export type Ability = PureAbility<[Actions, Subjects], MongoQuery>;
export type AbilityValue = RawRuleOf<Ability>;
