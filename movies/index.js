const autocompleteConfig = {
	renderOption(movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
		<img src="${imgSrc}"/>
		${movie.Title} (${movie.Year})
		`;
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: '1052433e',
				s: searchTerm
			}
		});

		if (response.data.Error && document.querySelector('input').value) return createErrorMsg();

		return response.data.Search;
	}
};

createAutoComplete({
	...autocompleteConfig,
	root: document.querySelector('#left-autocomplete'),

	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	}
});

createAutoComplete({
	...autocompleteConfig,
	root: document.querySelector('#right-autocomplete'),

	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	}
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '1052433e',
			i: movie.imdbID
		}
	});

	summaryElement.innerHTML = movieTemplate(response.data);

	side === 'left' ? (leftMovie = response.data) : (rightMovie = response.data);
	if (leftMovie && rightMovie) runComparison();
};

const runComparison = () => {
	const leftSideStats = document.querySelectorAll('#left-summary .notification');
	const rightSideStats = document.querySelectorAll('#right-summary .notification');

	leftSideStats.forEach((leftStat, i) => {
		const rightStat = rightSideStats[i];

		const leftSideValue = leftStat.dataset.value;
		const rightSideValue = rightStat.dataset.value;

		rightSideValue > leftSideValue
			? leftStat.classList.replace('is-primary', 'is-warning')
			: rightStat.classList.replace('is-primary', 'is-warning');
	});
};

const movieTemplate = (movieDetail) => {
	const boxOffice = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	const metascore = parseInt(movieDetail.Metascore);
	const imdbRating = parseFloat(movieDetail.imdbRating);
	const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

	const awards = movieDetail.Awards.split('').reduce((prev, word) => {
		const value = parseInt(word);
		if (isNaN(value)) return prev;
		else return prev + value;
	}, 0);

	return `<article class="media">
		<figure class="media-left">
			<p class="image">
				<img src="${movieDetail.Poster}" />
			</p>
		</figure>
		<div class="media-content">
			<div class="content">
				<h2>${movieDetail.Title}</h1>
				<h4>${movieDetail.Genre}</h4>
				<p>${movieDetail.Plot}</p>
			</div>
		</div>
	</article>
	<article data-value=${awards} class="notification is-primary">
		<p class="title">${movieDetail.Awards}</p>
		<p class="subtitle">Awards</p>
	</article>
	<article data-value=${boxOffice} class="notification is-primary">
		<p class="title">${movieDetail.BoxOffice}</p>
		<p class="subtitle">Box Office</p>
	</article>
	<article data-value=${metascore} class="notification is-primary">
		<p class="title">${movieDetail.Metascore}</p>
		<p class="subtitle">Metascore</p>
	</article>
	<article data-value=${imdbRating} class="notification is-primary">
		<p class="title">${movieDetail.imdbRating}</p>
		<p class="subtitle">IMDB Rating</p>
	</article>
	<article data-value=${imdbVotes} class="notification is-primary">
		<p class="title">${movieDetail.imdbVotes}</p>
		<p class="subtitle">IMDB Votes</p>
	</article>
	`;
};
