const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');
const gamesContainer = document.querySelector('#games-container');
const yearSpan = document.querySelector('#year');
const searchBar = document.querySelector('#search-bar');

let allGames = [];

const today = new Date();
yearSpan.textContent = today.getFullYear();

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.textContent = navigation.classList.contains('open') ? '❌' : '🍔';
});

async function getGames() {
    try {
        const response = await fetch('data/games.json');
        if (response.ok) {
            allGames = await response.json();
            displayGames(allGames);
        } else {
            console.error("Error al cargar el JSON");
        }
    } catch (error) {
        console.error("Error de red o sintaxis:", error);
    }
}

const displayGames = (games) => {
    gamesContainer.innerHTML = "";

    if (games.length === 0) {
        gamesContainer.innerHTML = "<p>No games found matching your search.</p>";
        return;
    }

    games.forEach((game) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${game.imageUrl}" alt="${game.name}" loading="lazy" width="300" height="200">
            <h3>${game.name}</h3>
            <p class="genre">${game.genre}</p>
            <p class="rating">⭐ ${game.rating}</p>
            <button class="details-btn" data-id="${game.id}">More Details</button>
        `;
        gamesContainer.appendChild(card);
    });
}

searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredGames = allGames.filter(game =>
        game.name.toLowerCase().includes(searchTerm) ||
        game.genre.toLowerCase().includes(searchTerm)
    );

    displayGames(filteredGames);
});

getGames();