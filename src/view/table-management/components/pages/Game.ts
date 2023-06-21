import React from 'react';

export type Position = Array<
	Array<{
		id: number;
		name: string;
	} | null>
>;
export type PositionObserver = (position: Position) => void;

export class Game {
	public knightPosition: Position = [];
	private observers: Array<PositionObserver> = [];

	public setKnightPosition(position: Position): void {
		this.knightPosition = position;
	}

	public observe(o: PositionObserver): () => void {
		this.observers.push(o);
		this.emitChange();
		o(this.knightPosition);

		return (): void => {
			this.observers = this.observers.filter(t => t !== o);
		};
	}

	public moveKnight(
		toX: number,
		toY: number,
		fromX: number,
		fromY: number,
		tempArray: Array<{x: number; y: number}>,
		idx: number,
	): void {
		const arr = this.knightPosition;

		console.log(tempArray, 'tempArray');

		console.log(arr, 'before');
		arr[toX][toY] = {id: 99, name: 'knight'};
		const source = tempArray[idx];

		console.log(source, 'source');
		console.log(idx, 'idx');
		console.log(toX, toY, 'to x y');
		// arr[source.x][source.y] = null;

		this.setKnightPosition(arr);
		this.emitChange();
	}

	// public canMoveKnight(toX: number, toY: number): boolean {
	// 	const position = this.knightPosition;
	// 	// const dx = toX - position[0].x;
	// 	// const dy = toY - position[0].y;

	// 	console.log(position);

	// 	return true;
	// }

	private emitChange() {
		const pos = this.knightPosition;
		this.observers.forEach(o => o && o(pos));
	}
}
