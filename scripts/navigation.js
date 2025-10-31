const btnNav = document.getElementById('btnNav');
const primaryNav = document.getElementById('primary-nav');


btnNav.addEventListener('click', () => {
    const expanded = btnNav.getAttribute('aria-expanded') === 'true' || false;
    btnNav.setAttribute('aria-expanded', !expanded);
    primaryNav.style.display = expanded ? 'none' : 'block';
});


window.addEventListener('resize', () => {
    if (window.innerWidth >= 720) {
        primaryNav.style.display = '';
        btnNav.setAttribute('aria-expanded', false);
    } else {
        primaryNav.style.display = 'none';
    }
});