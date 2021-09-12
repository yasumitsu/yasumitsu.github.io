const { body } = document;

function changeBackground(i) {
	let previousBackground;
	if (body.className) previousBackground = body.className;
	body.className = '';
	switch (i) {
		case '1':
			return previousBackground === 'background-1' ? false : body.classList.add('background-1');
		case '2':
			return previousBackground === 'background-2' ? false : body.classList.add('background-2');
		case '3':
			return previousBackground === 'background-3' ? false : body.classList.add('background-3');
		default:
			break;
	}
}
