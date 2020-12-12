import store from './library/core/model/gameStateStore.js';
import Game from './library/core/module/Game.js';
import setupInterfaceEvents from './library/core/module/setupInterfaceEvents.js';
import loadSprites from './assets/loadSprites.js';
import createPlayScene from './scenes/play.js';
import { appendState } from './library/core/model/general.js';
import updatePositioningOfViewports from './library/core/eventHandlers/updatePositioningOfViewports.js';
import animateGameObjects from './library/core/eventHandlers/animateGameObjects.js';
import drawFrame from './library/core/eventHandlers/drawFrame.js';
import renderDebugState from './utility/renderDebugState.js';

let game = new Game(store, 'Sorcerer', document.querySelector('.canvas__sorcerer'), { scale: 3 });

game.addEventHandler('init', initializeGame);
game.addEventHandler('beforeDraw', updatePositioningOfViewports);
game.addEventHandler('beforeDraw', animateGameObjects);
game.addEventHandler('draw', drawFrame);
game.addEventHandler('update', (state) => {
	renderDebugState(state.game);

	return state;
})
setupInterfaceEvents(game);

game.addScene('play', createPlayScene(game));

function initializeGame(state) {
	state = loadSprites(state);

	return appendState({
		levels: {},
		tiles: {}
	})(state);
}

game.start();
game.startScene('play');

console.log(store.getState());
