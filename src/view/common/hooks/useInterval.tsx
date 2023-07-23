import {useEffect, useRef} from 'react';

function useInterval(callback: () => void, delay: number | null): void {
	const savedCallback = useRef<() => void>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const tick = () => {
			savedCallback.current && savedCallback.current();
		};
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => {
				clearInterval(id);
			};
		}

		return undefined;
	}, [delay]);
}

export default useInterval;
