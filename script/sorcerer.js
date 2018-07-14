import Room from 'Room';
import SpriteManager from 'SpriteManager';

import Game from 'module/Game';
import LevelGenerator from 'module/LevelGenerator';

import Dialog from 'object/Dialog';
import Player from 'object/Player';

import {GreenKnight} from 'resource/creature/GreenKnight';

import gameStateStore from './core/model/gameStateStore';
import {createGameObject} from './core/module/GameObject';
import {addGameObject} from './core/model/gameObjects';
import {createViewport} from './core/module/Viewport';
import {addViewport} from './core/model/viewports';

const CANVAS_SIZE_WIDTH = 240;
const CANVAS_SIZE_HEIGHT = 176;
const MAP_SIZE_WIDTH = 36;
const MAP_SIZE_HEIGHT = 24;
const TILE_SIZE = 16;

load();

async function load() {
	await SpriteManager.loadLibrary('assets/sprites.json');

	// create canvas
	const canvas = document.querySelector('.canvas__sorcerer');
	canvas.width = CANVAS_SIZE_WIDTH;
	canvas.height = CANVAS_SIZE_HEIGHT;

	// Create room
	const room = new Room({
		width: MAP_SIZE_WIDTH * TILE_SIZE,
		height: MAP_SIZE_HEIGHT * TILE_SIZE,
	});
	room.setBackgroundColor('#000');
	room.useCanvas(canvas);

	// Create the player
	const player = new Player(GreenKnight);

	// Create world map
	const level = LevelGenerator.createLevel(room, player, 'king_slime_dijkstra_test')

	// Create player game object.
	let playerGameObject = createGameObject();
	addGameObject(playerGameObject);

	console.log(gameStateStore.getState());

	// Add viewport
	let playerViewport = createViewport({
		size: {
			width: CANVAS_SIZE_WIDTH,
			height: CANVAS_SIZE_HEIGHT,
		},
		gameObjectIdToFollow: playerGameObject.id,
	});
	addViewport(playerViewport);

	console.log(gameStateStore.getState());

	// Assemble the game!
	const game = new Game({
		room: room,
		level: level,
	});
	game.start();
}
