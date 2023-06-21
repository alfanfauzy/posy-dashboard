import {useMemo} from 'react';

import {Board} from './Board';
import {Game} from './Game';

export type ChessboardTutorialAppState = {
	knightPosition: [number, number];
};

/**
 * The Chessboard Tutorial Application
 */
export const TutorialApp = () => {
	const game = useMemo(() => new Game(), []);

	return (
		<div className="w-full">
			<Board game={game} />
		</div>
	);
};
