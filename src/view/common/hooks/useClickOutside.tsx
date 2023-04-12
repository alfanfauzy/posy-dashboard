/* eslint-disable react-hooks/exhaustive-deps */
import {RefObject, useEffect} from 'react';

type UseClickOutsideProps<TData> = {
	ref: RefObject<HTMLElement>;
	handleClick: () => void;
	state?: TData;
};

const useClickOutside = <TData extends object>({
	ref,
	handleClick,
	state,
}: UseClickOutsideProps<TData>) => {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handleClick();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, state]);
};

export default useClickOutside;
