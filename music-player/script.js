const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
	{
		name: '01 The Doors - Break On Through',
		displayName: 'Break On Through',
		artistName: 'The Doors'
	},
	{
		name: '02 The Doors - Light My Fire',
		displayName: 'Light My Fire',
		artistName: 'The Doors'
	},
	{
		name: '03 The Doors - The Crystal Ship',
		displayName: 'The Crystal Ship',
		artistName: 'The Doors'
	},
	{
		name: '04 The Doors - People Are Strange',
		displayName: 'People Are Strange',
		artistName: 'The Doors'
	},
	{
		name: '05 The Doors - Strange Days',
		displayName: 'Strange Days',
		artistName: 'The Doors'
	},
	{
		name: '06 The Doors - Love Me Two Times',
		displayName: 'Love Me Two Times',
		artistName: 'The Doors'
	},
	{
		name: '07 The Doors - Alabama Song',
		displayName: 'Alabama Song',
		artistName: 'The Doors'
	},
	{
		name: '08 The Doors - Five To One',
		displayName: 'Five To One',
		artistName: 'The Doors'
	},
	{
		name: '09 The Doors - Waiting For The Sun',
		displayName: 'Waiting For The Sun',
		artistName: 'The Doors'
	},
	{
		name: '10 The Doors - Spanish Caravan',
		displayName: 'Spanish Caravan',
		artistName: 'The Doors'
	},
	{
		name: "11 The Doors - When The Music's Over",
		displayName: "When The Music's Over",
		artistName: 'The Doors'
	},
	{
		name: '12 The Doors - Hello, I Love You',
		displayName: 'Hello, I Love You',
		artistName: 'The Doors'
	},
	{
		name: '13 The Doors - Roadhouse Blues',
		displayName: 'Roadhouse Blues',
		artistName: 'The Doors'
	},
	{
		name: '14 The Doors - L.A. Woman',
		displayName: 'L.A. Woman',
		artistName: 'The Doors'
	},
	{
		name: '15 The Doors - Riders on The Storm',
		displayName: 'Riders on The Storm',
		artistName: 'The Doors'
	},
	{
		name: '16 The Doors - Touch Me',
		displayName: 'Touch Me',
		artistName: 'The Doors'
	},
	{
		name: '17 The Doors - Love Her Madly',
		displayName: 'Love Her Madly',
		artistName: 'The Doors'
	},
	{
		name: '18 The Doors - The Unknown Soldier',
		displayName: 'The Unknown Soldier',
		artistName: 'The Doors'
	},
	{
		name: '19 The Doors - The End',
		displayName: 'The End',
		artistName: 'The Doors'
	}
];

let isPlaying = false;

function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');

	music.pause();
}

playBtn.addEventListener('click', () => {
	isPlaying ? pauseSong() : playSong();
});

function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artistName;
	music.src = `music/${song.name}.mp3`;
}

let songIndex = 0;

function prevSong() {
	songIndex--;
	if (songIndex < 0) songIndex = songs.length - 1;

	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) songIndex = 0;

	loadSong(songs[songIndex]);
	playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
	if (isPlaying) {
		const { duration, currentTime } = e.srcElement;
		const progressPercent = currentTime / duration * 100;
		progress.style.width = `${progressPercent}%`;
		let durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
		if (durationSeconds) durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		let currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
		if (currentSeconds) currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = music;
	music.currentTime = clickX / width * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
