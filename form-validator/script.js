const form = document.getElementById('form');
const passwordEl = document.getElementById('password');
const passwordConfirmEl = document.getElementById('password-confirm');
const message = document.getElementById('message');
const messageContainer = document.querySelector('.message-container');

let isValid = false;
let passwordsMatch = false;

function validateForm() {
	isValid = form.checkValidity();
	if (!isValid) {
		message.textContent = 'Please fill out all fields.';
		message.style.color = 'red';
		messageContainer.style.borderColor = 'red';
		return;
	}
	if (passwordEl.value === passwordConfirmEl.value) {
		passwordsMatch = true;
		passwordEl.style.borderColor = 'green';
		passwordConfirmEl.style.borderColor = 'green';
		passwordsMatch = false;
	} else {
		message.textContent = 'Make sure your passwords match.';
		message.style.color = 'red';
		messageContainer.style.borderColor = 'red';
		passwordConfirmEl.style.borderColor = 'red';
		return;
	}

	if (isValid && passwordsMatch) {
		message.textContent = 'Successfully Registered!';
		message.style.color = 'green';
		messageContainer.style.borderColor = 'green';
	}
}

function storeFormData() {
	const user = {
		name: form.name.value,
		phone: form.phone.value,
		email: form.email.value,
		website: form.website.value,
		password: form.password.value
	};
}

function processFormData(e) {
	e.preventDefault();
	validateForm();
	if (isValid && passwordsMatch) {
		storeFormData();
	}
}

form.addEventListener('submit', processFormData);
