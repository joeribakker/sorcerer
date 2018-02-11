export default class Room {
	constructor(size) {
		this.setSize(size);

		this.viewports = [];
		this.entities = [];
	}

	step(time) {
		// Update each gameObject
		// This should happen before updating the viewport, otherwise the viewport
		// follows entity position changes a step after they change position,
		// while the new position is already rendered.
		this.entities.forEach((gameObject) => {
			gameObject.step(time);
		});

		// update the viewports
		this.viewports.filter((viewport) => {
			return viewport.isActive();
		}).forEach((activeViewport) => {
			activeViewport.step(time);;
		});
	}

	draw(time) {
		// draw each viewport
		this.viewports.filter((viewport) => {
			return viewport.isActive();
		}).forEach((activeViewport) => {
			activeViewport.draw(time, this.canvas);
		});
	}

	addViewport(viewport) {
		this.viewports.push(viewport);
		viewport.setRoom(this);
	}

	useCanvas(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}

	addGameObject(gameObject) {
		this.entities.push(gameObject);
	}

	getEntities() {
		return this.entities;
	}

	setSize(size) {
		this.size = size;
	}

	getSize() {
		return this.size;
	}

	setBackgroundColor(backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	getBackgroundColor() {
		return this.backgroundColor;
	}

	drawBackground(context, offset, size) {
		context.fillStyle = this.backgroundColor;
		context.fillRect(
			offset.x,
			offset.y,
			size.width,
			size.height,
		);

		context.strokeStyle = '#bad455';
		context.strokeRect(
			offset.x,
			offset.y,
			size.width,
			size.height,
		);
	}
}
