import {useAbility} from '@/view/auth/components/organisms/rbac';
import {Subjects} from '@/view/auth/types';

export const CheckPermission = (permission: Array<Subjects>) => {
	const ability = useAbility();
	return permission.some(
		item => ability.can('read', item) || ability.can('view', item),
	);
};
