import Goal from 'module/Goal';
import Ticker from 'module/Ticker';

export default class MoveNorth extends Goal {
	constructor(originalIntent) {
		super(originalIntent);

		this.moved = false;
	}

	takeAction(actor) {
		if (!actor.dead && actor.moveUp()) {
			this.moved = true;
		} else {
			Ticker.schedule(actor.takeAction.bind(actor), actor.stats.moveCost);
			this.fail();
		}
	}

	isFinished() {
		return this.moved;
	}
}
