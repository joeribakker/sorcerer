import store from './../model/gameStateStore';
import createStateEntity from './../utility/createStateEntity';
import {addGameObject} from './../model/gameObjects';

export function createGameObject(components = {}) {
	let stateEntity = createStateEntity('gameObject', {
		components,
	});

	store.dispatch(addGameObject(stateEntity));

	return stateEntity;
}

export function doesGameObjectHaveComponents(gameObject, componentNames) {
	return componentNames.every((componentName) => {
		return doesGameObjectHaveComponent(gameObject, componentName);
	});
}

export function doesGameObjectHaveComponent(gameObject, componentName) {
	return gameObject.components.hasOwnProperty(componentName);
}
