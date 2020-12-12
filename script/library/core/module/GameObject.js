import createStateEntity from './../utility/createStateEntity.js';
import {getGameObjectsInCurrentRoom} from './../model/gameObjects.js';

export function createGameObject(components = {}) {
	return createStateEntity('gameObject', {
		components,
	});
}

export function findGameObjects(state, requiredComponentNames) {
	let gameObjects = getGameObjectsInCurrentRoom(state);

	return gameObjects.filter((gameObject) => {
		return doesGameObjectHaveComponents(gameObject, requiredComponentNames);
	});
}

export function doesGameObjectHaveComponents(gameObject, componentNames = []) {
	return componentNames.every((componentName) => {
		return doesGameObjectHaveComponent(gameObject, componentName);
	});
}

export function doesGameObjectHaveComponent(gameObject, componentName = []) {
	return gameObject.components.hasOwnProperty(componentName);
}
