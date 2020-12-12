import {findGameObjects} from './../library/core/module/GameObject.js';
import {updateComponentOfGameObject} from './../library/core/model/gameObjects.js';

export const updatePositionOfGameObjects = (state) => {
	let gameObjects = findGameObjects(state, ['positionInLevel', 'position']);

	return gameObjects.reduce((newState, gameObject) => {
		return updateComponentOfGameObject(
			gameObject.id,
			'position',
			calculatePositionFromPositionInLevel(gameObject.components.positionInLevel)
		)(newState);
	}, state);
}

function calculatePositionFromPositionInLevel(positionInLevel) {
	return {
		x: positionInLevel.x * 16,
		y: positionInLevel.y * 16,
	};
}
