const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/?', {
		params: {
			apikey: '1052433e',
			s: searchTerm
		}
	});

	if (response.data.Error) {
		return createErrorMsg();
	}

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

		resultsWrapper.appendChild(option);
	}
};
input.addEventListener('input', debounce(onInput, 500));
