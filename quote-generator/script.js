const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

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

async function getQuote() {
	showLoadingSpinner();
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		data.quoteAuthor === '' ? (authorText.innerText = 'unknown') : (authorText.innerText = data.quoteAuthor);
		data.quoteText.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
		quoteText.innerText = data.quoteText;
		removeLoadingSpinner();
	} catch (e) {
		getQuote();
		console.log('error: ', e);
	}
}

function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
