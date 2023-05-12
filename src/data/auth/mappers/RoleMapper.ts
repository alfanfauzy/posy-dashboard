import {Accesses} from '@/domain/auth/model/access';

import {Access} from '../types';

export const mapRoleAccess = (access: Access): Accesses => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return access.reduce((acc: any, curr) => {
		const [subject, action] = curr.key.split(':');
		const existingItem = acc.find(
			(item: {action: string}) => item.action === action,
		);
		if (existingItem) {
			if (Array.isArray(existingItem.subject)) {
				existingItem.subject.push(subject);
			} else {
				existingItem.subject = [existingItem.subject, subject];
			}
		} else {
			acc.push({
				action,
				subject,
			});
		}
		return acc;
	}, []);
};

export const mapRoleEnumToUserRole = (role?: string) => {
	switch (role) {
		case 'Owner': {
			return 'OWNER';
		}
		case 'Manager': {
			return 'MANAGER';
		}
		case 'Cashier': {
			return 'CASHIER';
		}
		case 'Waitress': {
			return 'WAITRESS';
		}
		default: {
			return undefined;
		}
	}
};
