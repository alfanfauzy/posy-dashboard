/* eslint-disable react-hooks/exhaustive-deps */
import {Ability} from '@/view/auth/types';
import {useAppSelector} from '@/view/common/store/hooks';
import {createMongoAbility} from '@casl/ability';
import {createContextualCan, useAbility as useCASLAbility} from '@casl/react';
import {useEffect, createContext, ReactNode} from 'react';

export const defaultAbilities = createMongoAbility<Ability>();
export const AbilityContext = createContext<Ability>(defaultAbilities);
// TODO: Wrap Can component and add `field` props type or use enum Field
export const Can = createContextualCan(AbilityContext.Consumer);
export const useAbility = () => useCASLAbility(AbilityContext);

export type AbilityProviderProps = {children: ReactNode};

export const AbilityProvider = ({children}: AbilityProviderProps) => {
	const {accesses} = useAppSelector(state => state.auth.authData);
	const ability = defaultAbilities;

	useEffect(() => {
		if (accesses) {
			ability.update(accesses);
		}
	}, [accesses]);

	return (
		<AbilityContext.Provider value={ability}>
			{children}
		</AbilityContext.Provider>
	);
};
