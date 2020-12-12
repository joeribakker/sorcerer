import { createGameObject } from './../library/core/module/GameObject.js';
import SpriteComponent from './../library/core/component/SpriteComponent.js';

export const CURSOR_COMPONENTS_BLUEPRINT = {
	isVisible: true,
	position: {
		x: 0,
		y: 0,
	},
	positionInLevel: {
		x: 0,
		y: 0,
	},
	sprite: new SpriteComponent({
		assetId: 'cursor',
	}),
	followMouseOnGrid: true,
};

export default function Cursor(components = {}) {
	return createGameObject({
		...CURSOR_COMPONENTS_BLUEPRINT,
		...components,
	});
}
