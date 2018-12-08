import System from './../library/core/module/System.js';
import {doesGameObjectHaveComponents} from './../library/core/module/GameObject.js';

export default class PlayerControlSystem extends System {
	constructor() {
		super();

		this.attemptAction = this.attemptAction.bind(this);

		this.onEvent('keydown', key => {
			this.findGameObjects().filter((gameObject) => {
				return doesGameObjectHaveComponents(gameObject, ['actor', 'player', 'canAct', 'positionInLevel'])
					&& !doesGameObjectHaveComponents(gameObject, ['isDead']);
			}).forEach((gameObject) => {
				this.attemptAction(gameObject, key)
			});
		});
	}

	attemptAction(gameObject, key) {
		let {positionInLevel} = gameObject.components;

		if (key === ' ') {
			this.game.emitEvent('actPickUp', gameObject);
		}

		if (key === 'q') {
			this.game.emitEvent('actWait', gameObject);
		}

		if (key === 'w') {
			this.game.emitEvent('actTowardsPosition', gameObject, {
				x: positionInLevel.x,
				y: positionInLevel.y - 1,
			});
		}

		if (key === 'd') {
			this.game.emitEvent('actTowardsPosition', gameObject, {
				x: positionInLevel.x + 1,
				y: positionInLevel.y,
			});
		}

		if (key === 's') {
			this.game.emitEvent('actTowardsPosition', gameObject, {
				x: positionInLevel.x,
				y: positionInLevel.y + 1,
			});
		}

		if (key === 'a') {
			this.game.emitEvent('actTowardsPosition', gameObject, {
				x: positionInLevel.x - 1,
				y: positionInLevel.y,
			});
		}
	}
}
