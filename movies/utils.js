const debounce = (func, delay = 1000) => {
	let timeoutId;
	return (...args) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(null, args);
		}, delay);
	};
};

function createErrorMsg() {
	dropdown.classList.remove('is-active');
	const h1 = document.createElement('h1');
	h1.textContent = 'Movie not found!';
	document.querySelector('#autocomplete').appendChild(h1);
	setTimeout(() => {
		h1.textContent = '';
	}, 2000);
}
