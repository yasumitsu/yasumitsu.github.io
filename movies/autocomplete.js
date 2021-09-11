const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	root.innerHTML = `<label><strong>Search</strong></label>
                <input class="input" />
                <div class="dropdown">
                    <div class="dropdown-menu"> 
                        <div class="dropdown-content results">
                         </div>
                    </div>
                </div>`;

	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	const onInput = async (e) => {
		const items = await fetchData(e.target.value);

		if (!items) {
			dropdown.classList.remove('is-active');
			return;
		}

		resultsWrapper.innerHTML = '';
		dropdown.classList.add('is-active');
		for (let item of items) {
			const option = document.createElement('a');

			option.classList.add('dropdown-item');
			option.innerHTML = renderOption(item);
			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(item);
				onOptionSelect(item);
			});

			resultsWrapper.appendChild(option);
		}
	};
	input.addEventListener('input', debounce(onInput, 500));

	document.addEventListener('click', (e) => {
		if (!root.contains(e.target)) dropdown.classList.remove('is-active');
	});
};
