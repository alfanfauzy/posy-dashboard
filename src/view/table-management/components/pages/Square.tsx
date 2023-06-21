import type {FC, ReactNode} from 'react';

export type SquareProps = {
	children?: ReactNode;
};

export const Square: FC<SquareProps> = ({children}) => {
	return <div className="border w-full h-full">{children}</div>;
};
