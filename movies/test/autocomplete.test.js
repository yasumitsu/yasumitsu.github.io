const waitFor = (selector) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (document.querySelector(selector)) {
				clearInterval(interval);
				clearTimeout(timeout);
				resolve();
			}
		}, 30);

		const timeout = setTimeout(() => {
			clearInterval(interval);
			reject();
		}, 2000);
	});
};

beforeEach(() => {
	document.querySelector('#target').innerHTML = '';
	createAutoComplete({
		root: document.querySelector('#target'),
		fetchData() {
			return [ { Title: 'Movie1' }, { Title: 'Movie2' }, { Title: 'Movie3' } ];
		},
		renderOption(movie) {
			return movie.Title;
		}
	});
});

it('dropdown starts closed', () => {
	const dropdown = document.querySelector('.dropdown');

	expect(dropdown.className).not.to.include('is-active');
});

it('after search, dropdown opens up', async () => {
	const input = document.querySelector('input');
	input.value = 'test';
	input.dispatchEvent(new Event('input'));

	await waitFor('.dropdown-item');

	const dropdown = document.querySelector('.dropdown');

	expect(dropdown.className).to.include('is-active');
});

it('after search, display results', async () => {
	const input = document.querySelector('input');
	input.value = 'test';
	input.dispatchEvent(new Event('input'));

	await waitFor('.dropdown-item');

	const items = document.querySelectorAll('.dropdown-item');

	expect(items.length).to.equal(3);
});
