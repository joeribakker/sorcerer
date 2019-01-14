import choose from './../utility/random/choose.js';
import {findGameObjects} from './../library/core/module/GameObject.js';

export const makeDecideActions = (emitEvent) => (state, gameObject) => {
	return decideActions(state, gameObject, emitEvent);
}

export const decideActions = (state, gameObject, emitEvent) => {
	let gameObjectsThatCanAct = findGameObjects(['actor', 'nonPlayer', 'canAct', 'positionInLevel']);

	return gameObjectsThatCanAct.reduce((newState, gameObject) => {
		let {isDead, positionInLevel} = gameObject.components;

		if (isDead) {
			return emitEvent('actWait', newState, gameObject);
		}

		let newPositionInLevel = choose([
			{x: positionInLevel.x, y: positionInLevel.y - 1},
			{x: positionInLevel.x + 1, y: positionInLevel.y},
			{x: positionInLevel.x, y: positionInLevel.y + 1},
			{x: positionInLevel.x - 1, y: positionInLevel.y},
		]);

		return emitEvent('actTowardsPosition', newState, gameObject, newPositionInLevel);
	}, state);
}
