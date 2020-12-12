import createStore from './../../../library/store/createStore.js';

export const INITIAL_STATE = {
	game: {
		name: '',
		currentRoomId: null,
		activeKeyboardKeys: [],
		activeMouseButtons: [],
		mousePosition: {x: 0, y: 0},
		mouseViewportPosition: {x: 0, y: 0},
	},
	rooms: {},
	sprites: {},
	spriteFrames: {},
	viewports: {},
	gameObjects: {},
};

export default createStore(INITIAL_STATE);

export function createGameStateStore(stateToAppend = {}) {
	return createStore({
		...INITIAL_STATE,
		...stateToAppend,
	});
}
