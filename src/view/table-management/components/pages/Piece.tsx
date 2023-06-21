import type {FC} from 'react';

import {Knight} from './Knight';

export type PieceProps = {
	isKnight: boolean;
	id: string;
};

export const Piece: FC<PieceProps> = ({isKnight, id}) =>
	isKnight ? <Knight id={id} /> : null;
