const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

function selectRandomQuote() {
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	const quote = apiQuotes[getRandomInt(apiQuotes.length)];
	console.log(quote);
	!quote.author ? (authorText.textContent = 'Unknown') : (authorText.textContent = quote.author);
	quote.text.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
	quoteText.textContent = quote.text;
}

async function getQuotes() {
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		showLoadingSpinner();
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		selectRandomQuote();
		// console.log(selectRandomQuote);
		removeLoadingSpinner();
	} catch (error) {
		authorText.textContent = 'the developer';
		quoteText.textContent = 'Even the API is down or something else went wrong, please refresh the page.';
	}
}

function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
