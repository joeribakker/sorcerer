import Actor from './Actor';
import SpriteAtlas from './../core/SpriteAtlas';
import PubSub from './../core/PubSub';

export default class Player extends Actor {
	constructor(options) {
		super(options);

		let spriteAtlasDefinition = '{ "file": "assets/images/character-sheet.png", "frames": [ { "name": "player_idle_0", "origin": { "x": 0, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_1", "origin": { "x": 16, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_2", "origin": { "x": 32, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_3", "origin": { "x": 48, "y": 0 }, "size": { "width": 16, "height": 16 } }, {"name": "player_idle_4", "origin": { "x": 64, "y": 0 }, "size": { "width": 16, "height": 16 } }, { "name": "player_idle_5", "origin": { "x": 80, "y": 0 }, "size": { "width": 16, "height": 16 } } ] }';
		let spriteAtlas = new SpriteAtlas(JSON.parse(spriteAtlasDefinition));
		let playerSprite = spriteAtlas.createSpriteWithFrames([
			'player_idle_0',
			'player_idle_0',
			'player_idle_0',
			'player_idle_0',
			'player_idle_0',
			'player_idle_1',
			'player_idle_2',
			'player_idle_3',
			'player_idle_3',
			'player_idle_3',
			'player_idle_3',
			'player_idle_4',
			'player_idle_5',
		]);

		playerSprite.setFramesPerSecond(10);
		this.setSprite(playerSprite);
		this.setBoundaries({width: 16, height: 16});

		this.setSolidity(true);

		window.addEventListener('keydown', this.onKeyDown.bind(this));
	}

	onKeyDown(event) {
		let moved = false;
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			moved = this.moveUp();
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			moved = this.moveRight();
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			moved = this.moveDown();
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			moved = this.moveLeft();
		}

		if (moved) {
			PubSub.publish('playerTurnTaken');
		}
	}
}
