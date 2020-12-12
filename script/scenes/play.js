import { LEVEL_WIDTH, LEVEL_HEIGHT, GRID_TILE_WIDTH, GRID_TILE_HEIGHT } from './../constants.js';
import createRandomLevel from './../utility/createRandomLevel.js';
import { setCurrentRoomId } from './../library/core/model/game.js';
import { addRoom, addGameObjectToRoom, addViewportToRoom } from './../library/core/model/rooms.js';
import { addViewport } from './../library/core/model/viewports.js';
import { addGameObject } from './../library/core/model/gameObjects.js';

import { createViewport } from './../library/core/module/Viewport.js';
import { createRoom } from './../library/core/module/Room.js';

import GreenKnight from './../gameObjects/actors/GreenKnight.js';
import Cursor from './../gameObjects/Cursor.js';

import { updateActionTicks } from './../eventHandlers/updateActionTicks.js';
import { updatePositionOfGameObjects } from './../eventHandlers/updatePositionOfGameObjects.js';
import { updateMouseGridPositions } from './../eventHandlers/updateMouseGridPositions.js';
import { makeAttemptActionForKey } from './../eventHandlers/attemptActionForKey.js'
import { makeGameObjectDies } from './../eventHandlers/gameObjectDies.js';
import { doDeathRattle } from './../eventHandlers/doDeathRattle.js';
import { log } from './../eventHandlers/log.js';
import { makeDecideActions } from './../eventHandlers/decideActions.js';
import { makeActTowardsPosition } from './../eventHandlers/actTowardsPosition.js';
import { makePickUp } from './../eventHandlers/pickUp.js';
import { concludeTurn } from './../eventHandlers/concludeTurn.js';
import { makeWait } from './../eventHandlers/wait.js';
import { makeAttackTarget } from './../eventHandlers/attackTarget.js';
import { makeDealDamage } from './../eventHandlers/dealDamage.js';
import { makeTakeDamage } from './../eventHandlers/takeDamage.js';
import { makeCheckForDeath } from './../eventHandlers/checkForDeath.js';
import { calculateEquipmentDamage } from './../eventHandlers/calculateEquipmentDamage.js';
import { makeEmitMouseGridDown } from './../eventHandlers/emitMouseGridDown.js';

export default function createPlayScene(game) {
	return {
		'initScene:play': [ initializePlayScene ],
		keyDown: [ makeAttemptActionForKey(game.emitEvent) ],
		update: [
			updateActionTicks,
			makeDecideActions(game.emitEvent),
			updatePositionOfGameObjects
		],
		actTowardsPosition: [ makeActTowardsPosition(game.emitEvent) ],
		actPickUp: [ makePickUp(game.emitEvent) ],
		actWait: [ makeWait(game.emitEvent) ],
		concludeTurn: [ concludeTurn ],
		attackTarget: [ makeAttackTarget(game.emitEvent) ],
		beforeDealDamage: [ calculateEquipmentDamage ],
		dealDamage: [ makeDealDamage(game.emitEvent) ],
		takeDamage: [ makeTakeDamage(game.emitEvent) ],
		hasTakenDamage: [ makeCheckForDeath(game.emitEvent) ],
		death: [
			makeGameObjectDies(game.emitEvent),
			doDeathRattle
		],
		log: [ log ],
		mouseMove: updateMouseGridPositions,
		mouseDown: makeEmitMouseGridDown(game.emitEvent),
	}
}

function initializePlayScene(state) {
	// Create a room
	let room = createRoom({
		size: {
			width: LEVEL_WIDTH * GRID_TILE_WIDTH,
			height: LEVEL_HEIGHT * GRID_TILE_HEIGHT,
		},
	});

	state = addRoom(room)(state);
	state = setCurrentRoomId(room.id)(state);

	// Create the player character
	let player = new GreenKnight({
		player: true,
	});

	state = addGameObject(player)(state);
	state = addGameObjectToRoom(room.id, player.id)(state);

	state = createRandomLevel(state, room, player);

	let viewport = createViewport({
		gameObjectIdToFollow: player.id,
		size: {
			width: 240,
			height: 176,
		},
	});

	// Create cursor
	let cursor = new Cursor();
	state = addGameObject(cursor)(state);
	state = addGameObjectToRoom(room.id, cursor.id)(state);

	state = addViewport(viewport)(state);
	state = addViewportToRoom(room.id, viewport.id)(state);

	return state;
}
