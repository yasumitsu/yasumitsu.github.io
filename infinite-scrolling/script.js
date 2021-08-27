const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 10;

const apiKey = 'V2Ik6uLXIEFhC6Hx-dQosjC6KKgYmHdWRmiuNX46MmA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

function setAttributes(el, att) {
	for (const key in att) {
		el.setAttribute(key, att[key]);
	}
}

function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	console.log(photosArray);

	photosArray.forEach((photo) => {
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank'
		});
		const img = document.createElement('img');
		!photo.description
			? setAttributes(img, {
					src: photo.urls.regular,
					alt: photo.alt_description,
					title: photo.alt_description
				})
			: setAttributes(img, {
					src: photo.urls.regular,
					alt: photo.alt_description,
					title: photo.description
				});
		img.addEventListener('load', imageLoaded);
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		window.addEventListener('scroll', () => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
				getPhotos();
				console.log('load more');
			}
		});
		displayPhotos();
	} catch (error) {
		console.log(error);
		loader.hidden = true;
		errorMessage.hidden = false;
	}
}

getPhotos();
