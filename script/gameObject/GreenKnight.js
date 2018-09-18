import Actor from './Actor';
import HealthComponent from './../component/HealthComponent';
import SpriteComponent from './../library/core/component/SpriteComponent';

export const GREEN_KNIGHT_COMPONENTS_BLUEPRINT = {
	name: 'Green Knight',
	health: new HealthComponent({
		maximum: 20,
	}),
	sprite: new SpriteComponent({
		assetId: 'greenknight',
		framesPerSecond: 10,
	}),
};

export default function GreenKnight(components = {}) {
	return new Actor({
		...GREEN_KNIGHT_COMPONENTS_BLUEPRINT,
		...components,
	});
}
