const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
	button.disabled = !button.disabled;
}
function tellMe(joke) {
	VoiceRSS.speech({
		key: '268026b0705447589be4633cdfcca73d',
		src: joke,
		hl: 'en-ie',
		v: 'Oran',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	});
}

async function getJokes() {
	let joke = '';
	const apiUrl = 'https://v2.jokeapi.dev/joke/Any';

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		tellMe(joke);
		toggleButton();
	} catch (error) {
		tellMe(error);
	}
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
