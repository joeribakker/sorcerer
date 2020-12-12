import { GRID_TILE_WIDTH, GRID_TILE_HEIGHT } from './../constants.js';

export const makeEmitMouseGridDown = (emitEvent) => {
	return (state) => {
		return emitMouseGridDown(emitEvent, state);
	}
}

export const emitMouseGridDown = (emitEvent, state) => {
	return emitEvent('mouseGridDown', state, {
		x: Math.floor(state.game.mousePosition.x / GRID_TILE_WIDTH),
		y: Math.floor(state.game.mousePosition.y / GRID_TILE_HEIGHT),
	});
}
