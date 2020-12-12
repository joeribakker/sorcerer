import { getCurrentRoom, getActiveViewportsInRoomWithId } from './../model/rooms.js';
import { getSpriteWithId } from './../model/sprites.js';
import { getSpriteFrameWithId } from './../model/spriteFrames.js';
import { getImageFromFilePath } from './../module/SpriteFrame.js';
import { findGameObjects } from './../module/GameObject.js';

export default function drawFrame(state, context) {
	let viewports = getActiveViewportsInRoomWithId(state, getCurrentRoom(state).id);
	let gameObjectsToDraw = findGameObjects(state, ['sprite', 'position']).filter((gameObject) => {
		return gameObject.components.isVisible;
	});

	viewports.forEach((viewport) => {
		drawFrameInViewport(state, gameObjectsToDraw, viewport, context);
	});

	return state;
}

function drawFrameInViewport(state, gameObjects, viewport, context) {
	clearCanvasContext(context, viewport);
	drawCurrentRoomBackgroundInViewport(state, context, viewport);

	gameObjects.filter(gameObject => isGameObjectVisibleInViewport(state, gameObject, viewport)).forEach(gameObject => {
		renderGameObjectInViewport(state, gameObject, viewport, context);
	});
}

function renderGameObjectInViewport(state, gameObject, viewport, context) {
	let {sprite, position} = gameObject.components;

	let spriteAsset = getSpriteWithId(state, sprite.assetId);
	let currentSpriteFrame = getSpriteFrameWithId(state, spriteAsset.spriteFrames[sprite.currentFrameIndex]);

	let drawPosition = {
		x: (position.x + spriteAsset.offset.x) - (viewport.position.x - viewport.origin.x),
		y: (position.y + spriteAsset.offset.y) - (viewport.position.y - viewport.origin.y),
	};

	drawSpriteFrame(context, currentSpriteFrame, drawPosition);
}

function drawSpriteFrame(context, spriteFrame, position) {
	context.drawImage(
		getImageFromFilePath(spriteFrame.imageFilePath),
		spriteFrame.origin.x, spriteFrame.origin.y,
		spriteFrame.size.width, spriteFrame.size.height,
		position.x, position.y,
		spriteFrame.size.width, spriteFrame.size.height
	);
}

function clearCanvasContext(context, viewport) {
	context.clearRect(viewport.origin.x, viewport.origin.y, viewport.size.width, viewport.size.height);
}

function drawCurrentRoomBackgroundInViewport(state, context, viewport) {
	let currentRoom = getCurrentRoom(state);

	context.fillStyle = currentRoom.backgroundColor;
	context.fillRect(
		viewport.origin.x,
		viewport.origin.y,
		viewport.size.width,
		viewport.size.height,
	);
}

function isGameObjectVisibleInViewport(state, gameObject, viewport) {
	let {sprite, position} = gameObject.components;

	let spriteAsset = getSpriteWithId(state, sprite.assetId);
	let currentSpriteFrame = getSpriteFrameWithId(state, spriteAsset.spriteFrames[sprite.currentFrameIndex]);

	let visibleBoundingBox = {
		x: position.x + spriteAsset.offset.x,
		y: position.y + spriteAsset.offset.y,
		width: currentSpriteFrame.size.width,
		height: currentSpriteFrame.size.height,
	}

	return visibleBoundingBox.x < viewport.position.x + viewport.size.width
		&& visibleBoundingBox.y < viewport.position.y + viewport.size.height
		&& visibleBoundingBox.x + visibleBoundingBox.width > viewport.position.x
		&& visibleBoundingBox.y + visibleBoundingBox.height > viewport.position.y;
}
