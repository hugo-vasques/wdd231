import { places } from '../data/places.mjs';

const messageElement = document.querySelector('#visitor-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diff = now - parseInt(lastVisit);

    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.floor(diff / oneDay);

    if (diff < oneDay) {
        messageElement.textContent = "Back so soon! Awesome!";
    } else {
        const dayWord = days === 1 ? "day" : "days";
        messageElement.textContent = `You last visited ${days} ${dayWord} ago.`;
    }
}

localStorage.setItem('lastVisit', now);

const placesContainer = document.querySelector('#places-grid');

function displayPlaces(placesList) {
    placesList.forEach(place => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = place.name;

        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = place.image;
        img.alt = place.name;
        img.loading = "lazy";
        img.width = 300;
        img.height = 200;

        figure.appendChild(img);

        const address = document.createElement('address');
        address.textContent = place.address;

        const desc = document.createElement('p');
        desc.textContent = place.description;

        const button = document.createElement('button');
        button.textContent = "Learn More";

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(desc);
        card.appendChild(button);

        placesContainer.appendChild(card);
    });
}

displayPlaces(places);