const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [ nav1, nav2, nav3, nav4, nav5 ];

function navAnimation(rm, add) {
	navItems.forEach((nav, i) => {
		nav.classList.replace(`slide-${rm}-${i + 1}`, `slide-${add}-${i + 1}`);
	});
}

function toggleNav() {
	menuBars.classList.toggle('change');
	overlay.classList.toggle('overlay-active');
	overlay.classList.contains('overlay-active')
		? (overlay.classList.replace('overlay-slide-left', 'overlay-slide-right'), navAnimation('out', 'in'))
		: (overlay.classList.replace('overlay-slide-right', 'overlay-slide-left'), navAnimation('in', 'out'));
}

menuBars.addEventListener('click', toggleNav);

navItems.forEach((nav) => {
	nav.addEventListener('click', toggleNav);
});
