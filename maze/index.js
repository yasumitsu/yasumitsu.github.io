const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const cellsHorizontal = 14;
const cellsVertical = 10;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		wireframes: false,
		width,
		height
	}
});
Render.run(render);
Runner.run(Runner.create(), engine);

// walls
const walls = [
	Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
	Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
	Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
	Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

//maze generation

const shuffle = (arr) => {
	let counter = arr.length;

	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);

		counter--;

		const temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	}

	return arr;
};

const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) => {
	//if cell visited, return
	if (grid[row][column]) return;

	//mark this cell as visited
	grid[row][column] = true;

	//assemble randomly-ordered list of neighbors
	const neighbors = shuffle([
		[ row - 1, column, 'up' ],
		[ row, column + 1, 'right' ],
		[ row + 1, column, 'down' ],
		[ row, column - 1, 'left' ]
	]);

	//for each neighbor (do something)
	for (let neighbor of neighbors) {
		const [ nextRow, nextColumn, direction ] = neighbor;

		// See if that neighbor is out of bounds
		if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) continue;

		// If we have visited that neighbor, continue to next neighbor
		if (grid[nextRow][nextColumn]) continue;

		// Remove a wall from either horizontals or verticals
		if (direction === 'left') verticals[row][column - 1] = true;
		else if (direction === 'right') verticals[row][column] = true;
		else if (direction === 'up') horizontals[row - 1][column] = true;
		else if (direction === 'down') horizontals[row][column] = true;

		stepThroughCell(nextRow, nextColumn);
	}
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) return;

		const wall = Bodies.rectangle(
			columnIndex * unitLengthX + unitLengthX * 0.5,
			rowIndex * unitLengthY + unitLengthY,
			unitLengthX,
			5,
			{
				label: 'wall',
				isStatic: true,
				render: {
					fillStyle: 'red'
				}
			}
		);
		World.add(world, wall);
	});
});

verticals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) return;

		const wall = Bodies.rectangle(
			columnIndex * unitLengthX + unitLengthX,
			rowIndex * unitLengthY + unitLengthY * 0.5,
			5,
			unitLengthY,
			{
				isStatic: true,
				label: 'wall',
				render: {
					fillStyle: 'red'
				}
			}
		);
		World.add(world, wall);
	});
});

const goal = Bodies.rectangle(
	width - unitLengthX * 0.5,
	height - unitLengthY * 0.5,
	unitLengthX * 0.7,
	unitLengthY * 0.7,
	{
		isStatic: true,
		label: 'goal',
		render: {
			fillStyle: 'green'
		}
	}
);
World.add(world, goal);

const ballRadius = Math.min(unitLengthX, unitLengthY) * 0.25;
const ball = Bodies.circle(unitLengthX * 0.5, unitLengthY * 0.5, ballRadius, {
	label: 'ball',
	render: {
		fillStyle: 'blue'
	}
});

World.add(world, ball);

document.addEventListener('keydown', (e) => {
	const { x, y } = ball.velocity;
	//up
	if (e.key === 'w') {
		Body.setVelocity(ball, { x, y: y - 5 });
	}
	//right
	if (e.key === 'd') {
		Body.setVelocity(ball, { x: x + 5, y });
	}
	//down
	if (e.key === 's') {
		Body.setVelocity(ball, { x, y: y + 5 });
	}
	//left
	if (e.key === 'a') {
		Body.setVelocity(ball, { x: x - 5, y });
	}
});

// win condition

Events.on(engine, 'collisionStart', (e) => {
	e.pairs.forEach((collision) => {
		const labels = [ 'ball', 'goal' ];
		if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
			world.gravity.y = 1;
			world.bodies.forEach((body) => {
				if (body.label === 'wall') Body.setStatic(body, false);
			});
		}
	});
});
