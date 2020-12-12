import {findGameObjects} from './../library/core/module/GameObject.js';

export const makeAttemptActionForKey = (emitEvent) => (state, key) => {
	return attemptActionForKey(state, key, emitEvent);
}

export const attemptActionForKey = (state, key, emitEvent) => {
	return findGameObjects(state, ['actor', 'player', 'canAct', 'positionInLevel']).filter((gameObject) => {
		return gameObject.components.player
			&& !gameObject.components.isDead;
	}).reduce((newState, gameObject) => {
		let {positionInLevel} = gameObject.components;

		if (key === ' ') {
			return emitEvent('actPickUp', newState, gameObject);
		}

		if (key === 'q') {
			return emitEvent('actWait', newState, gameObject);
		}

		if (key === 'w') {
			return emitEvent('actTowardsPosition', newState, gameObject, {
				x: positionInLevel.x,
				y: positionInLevel.y - 1,
			});
		}

		if (key === 'd') {
			return emitEvent('actTowardsPosition', newState, gameObject, {
				x: positionInLevel.x + 1,
				y: positionInLevel.y,
			});
		}

		if (key === 's') {
			return emitEvent('actTowardsPosition', newState, gameObject, {
				x: positionInLevel.x,
				y: positionInLevel.y + 1,
			});
		}

		if (key === 'a') {
			return emitEvent('actTowardsPosition', newState, gameObject, {
				x: positionInLevel.x - 1,
				y: positionInLevel.y,
			});
		}

		return newState;
	}, state);
}
