import Entity from './../core/Entity';
import SpriteAtlas from './../core/SpriteAtlas';
import Log from './../modules/Log';

const STATS_DEFAULT = {
	strength: 1,
	maxHealth: 1,
}

export default class Actor extends Entity {
	constructor (creatureDefinition, options) {
		super(options);
		this.applyCreatureDefinition(creatureDefinition);

		this.health = this.stats.maxHealth;
	}

	applyCreatureDefinition(creatureDefinition) {
		this.type = creatureDefinition.type;
		this.applyStats(creatureDefinition.stats);
		this.setSprite(creatureDefinition.sprite);
		this.setSize(creatureDefinition.size);
		this.setSolidity(creatureDefinition.solid);
	}

	applyStats(stats) {
		this.stats = Object.assign({}, STATS_DEFAULT, stats);
	}

	bumpInto(target) {
		if (target.canBeAttacked()) {
			Log.showMessage(`<em>${this.type}</em> attacks <em>${target.type}</em>`);

			this.attackTarget(target);
			return true;
		}

		return false;
	}

	attackTarget(target) {
		target.applyDamage(this.calculateAttackDamage());
	}

	calculateAttackDamage() {
		return this.stats.strength;
	}

	applyDamage(damage) {
		Log.showMessage(`<em>${this.type}</em> takes ${damage} damage`);
		this.reduceHealth(damage);
	}

	restoreHealth(amount) {
		this.changeHealth(this.health + amount);
	}

	reduceHealth(amount) {
		this.changeHealth(this.health - amount);
	}

	changeHealth(health) {
		if (health > this.stats.maxHealth) {
			this.health = this.stats.maxHealth;
			Log.showMessage(`<em>${this.type}</em> health max at ${this.health}`);
		} else if (health <= 0) {
			this.health = 0;
			this.die();
		} else {
			this.health = health;
			Log.showMessage(`<em>${this.type}</em> health is ${this.health}/${this.stats.maxHealth}`);
		}
	}

	moveTo(position) {
		if (this.isInBoundsOfRoomAtPosition(this.room, position)) {
			let entitiesAtPosition = this.room.findSolidEntitiesInBoundaries({
				x: position.x,
				y: position.y,
				width: this.sprite.size.width,
				height: this.sprite.size.height,
			}, [this]);

			if (entitiesAtPosition.length === 0) {
				this.setPosition(position);
				return true;
			} else if (entitiesAtPosition.length > 0) {
				let actionTaken = false;

				entitiesAtPosition.forEach((entity) => {
					let bumpIntoResult = this.bumpInto(entity);

					if (bumpIntoResult) {
						actionTaken = true;
					}
				});

				return actionTaken;
			}
		}

		return false;
	}

	moveUp() {
		return this.moveTo({
			x: this.position.x,
			y: this.position.y - 16
		});
	}

	moveRight() {
		return this.moveTo({
			x: this.position.x + 16,
			y: this.position.y
		});
	}

	moveDown() {
		return this.moveTo({
			x: this.position.x,
			y: this.position.y + 16
		});
	}

	moveLeft() {
		return this.moveTo({
			x: this.position.x - 16,
			y: this.position.y
		});
	}

	canBeAttacked() {
		return !this.dead;
	}

	die() {
		this.dead = true;
		this.size = {
			width: 16,
			height: 16,
		}
		this.sprite = getDeadSprite();

		Log.showMessage(`<em>${this.type}</em> is dead`);
	}

	isInBoundsOfRoomAtPosition(room, position) {
		return position.x >= 0
			&& position.y >= 0
			&& position.x + this.size.width <= room.size.width
			&& position.y + this.size.height <= room.size.height;
	}
}

function getDeadSprite() {
	let spriteAtlasDefinition = '{ "file": "assets/images/grave-sheet.png", "frames": [ { "name": "grave_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
	let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
	let graveSprite = spriteAtlas.createSpriteWithFrames([
		'grave_0',
	]);

	return graveSprite;
}