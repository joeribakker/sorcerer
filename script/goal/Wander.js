import Goal from 'module/Goal';
import MoveNorth from 'goal/MoveNorth';
import MoveEast from 'goal/MoveEast';
import MoveSouth from 'goal/MoveSouth';
import MoveWest from 'goal/MoveWest';

export default class Wander extends Goal {
	takeAction(actor) {
		if (!actor.dead) {
			let direction = Math.round(Math.random() * 3);
			let howManyTimes = Math.round(Math.random() * 2) + 1;

			for(let t = 0; t < howManyTimes; t++) {
				if (direction === 0) {
					this.subGoals.push(new MoveNorth(this));
				}

				if (direction === 1) {
					this.subGoals.push(new MoveEast(this));
				}

				if (direction === 2) {
					this.subGoals.push(new MoveSouth(this));
				}

				if (direction === 3) {
					this.subGoals.push(new MoveWest(this));
				}
			}
		}
	}

	isFinished() {
		return false;
	}
}
