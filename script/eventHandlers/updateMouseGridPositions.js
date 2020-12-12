import { findGameObjects } from './../library/core/module/GameObject.js';
import { updateComponentOfGameObject } from './../library/core/model/gameObjects.js';
import { GRID_TILE_WIDTH, GRID_TILE_HEIGHT } from './../constants.js';

export const updateMouseGridPositions = (state) => {
	return findGameObjects(state).filter((gameObject) => {
		return gameObject.components.followMouseOnGrid;
	}).reduce((newState, gameObject) => {
		return updateComponentOfGameObject(gameObject.id, 'positionInLevel', {
			x: Math.floor(state.game.mousePosition.x / GRID_TILE_WIDTH),
			y: Math.floor(state.game.mousePosition.y / GRID_TILE_HEIGHT),
		})(newState);
	}, state);
}
