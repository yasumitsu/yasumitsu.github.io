const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '1052433e',
			s: searchTerm
		}
	});

	if (response.data.Error && input.value) return createErrorMsg();

	return response.data.Search;
};

const root = document.querySelector('#autocomplete');

root.innerHTML = `<label><strong>Search for a movie</strong></label>
                <input class="input" />
                <div class="dropdown">
                    <div class="dropdown-menu"> 
                        <div class="dropdown-content results">
                         </div>
                    </div>
                </div>`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async (e) => {
	const movies = await fetchData(e.target.value);

	if (!movies) {
		dropdown.classList.remove('is-active');
		return;
	}

	resultsWrapper.innerHTML = '';
	dropdown.classList.add('is-active');
	for (let movie of movies) {
		const option = document.createElement('a');

		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		option.classList.add('dropdown-item');
		option.innerHTML = `
        <img src="${imgSrc}"/>
        ${movie.Title}
        `;
		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active');
			input.value = movie.Title;
			onMovieSelect(movie);
		});

		resultsWrapper.appendChild(option);
	}
};
input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', (e) => {
	if (!root.contains(e.target)) dropdown.classList.remove('is-active');
});

const onMovieSelect = async (movie) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '1052433e',
			i: movie.imdbID
		}
	});

	document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
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
	<article class="notification is-primary">
		<p class="title">${movieDetail.Awards}</p>
		<p class="subtitle">Awards</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movieDetail.BoxOffice}</p>
		<p class="subtitle">Box Office</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movieDetail.Metascore}</p>
		<p class="subtitle">Metascore</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movieDetail.imdbRating}</p>
		<p class="subtitle">IMDB Rating</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movieDetail.imdbVotes}</p>
		<p class="subtitle">IMDB Votes</p>
	</article>
	`;
};
