import Goal from 'module/Goal';

export default class MoveWest extends Goal {
	constructor(originalGoal) {
		super(originalGoal);

		this.moved = false;
	}

	takeAction(actor) {
		return new Promise((success, fail) => {
			if (actor.dead) {
				return fail();
			}

			let newLevelPosition = {
				x: actor.positionInLevel.x - 1,
				y: actor.positionInLevel.y,
			};

			if (!actor.canMoveToPosition(newLevelPosition)) {
				return fail();
			}

			actor.moveTo(newLevelPosition);
			this.moved = true;

			return success();
		});
	}

	isFinished() {
		return this.moved;
	}
}
