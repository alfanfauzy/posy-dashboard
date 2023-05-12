import {Ability, Actions, Subjects} from '@/view/auth/types';
import {useRouter} from 'next/router';

import {useAbility} from '.';

type GuardProps = {
	action: Actions;
	on: Subjects | Array<Subjects>;
	field?: string;
	children: React.ReactNode;
	redirect?: string;
};

export const checkIsAllowed = (
	ability: Ability,
	{action, on, field}: Pick<GuardProps, 'action' | 'on' | 'field'>,
) => {
	if (Array.isArray(on)) {
		for (let i = 0; i < on.length; i++) {
			// Immediately return true if there's one allowed subject
			const isAllowed = ability.can(action, on[i] as Subjects, field);

			if (isAllowed) {
				return true;
			}
		}

		return false;
	}

	return ability.can(action, on, field);
};

export const Guard = ({
	action,
	on,
	field,
	children,
	redirect = '/404',
}: GuardProps) => {
	const router = useRouter();
	const ability = useAbility();
	const isAllowed = checkIsAllowed(ability, {on, field, action});

	if (!isAllowed) {
		router.push(redirect);
		return null;
	}

	return <>{children}</>;
};
