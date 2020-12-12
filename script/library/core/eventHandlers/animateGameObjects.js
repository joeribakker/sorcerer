import { getSpriteWithId } from './../model/sprites.js';
import { updateComponentOfGameObject } from './../model/gameObjects.js';
import { findGameObjects } from './../module/GameObject.js';

const timeOfAnimationStart = new Map();

export default function animateGameObjects(state, currentTime) {
	let gameObjectsWithSprite = findGameObjects(state, ['sprite']);

	return gameObjectsWithSprite.reduce((newState, gameObject) => {
		let {sprite} = gameObject.components;
		let spriteAsset = getSpriteWithId(newState, sprite.assetId);

		// If no animation is supposed to run for any reason, simply return.
		if (
			sprite.framesPerSecond === 0 ||
			spriteAsset.spriteFrames.length <= 1 ||
			sprite.isAnimationPaused
		) {
			return newState;
		}

		// Keep track of when a gameObject started animating this particular sprite.
		if (!timeOfAnimationStart.has(`${gameObject.id}${spriteAsset.id}`)) {
			timeOfAnimationStart.set(`${gameObject.id}${spriteAsset.id}`, currentTime);
		}

		let newFrameIndex = calculateFrameIndexFromTimeDifference(
			spriteAsset.spriteFrames.length,
			sprite.framesPerSecond,
			timeOfAnimationStart.get(`${gameObject.id}${spriteAsset.id}`),
			currentTime,
			sprite.isAnimationLooping
		);

		return updateComponentOfGameObject(gameObject.id, 'sprite', {
			currentFrameIndex: newFrameIndex
		})(newState);
	}, state);
}

export function calculateFrameIndexFromTimeDifference(amountOfFrames, framesPerSecond, timeOfAnimationStart, currentTime, isLooping = true) {
	let elapsed = currentTime - timeOfAnimationStart;

	if (isLooping) {
		return Math.round(elapsed / (1000 / framesPerSecond)) % amountOfFrames;
	}

	return Math.min((Math.round(elapsed / 1000) / framesPerSecond), amountOfFrames - 1);
}
