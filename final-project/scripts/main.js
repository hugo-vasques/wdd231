const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');
const gamesContainer = document.querySelector('#games-container');
const yearSpan = document.querySelector('#year');
const searchBar = document.querySelector('#search-bar');

const modal = document.querySelector('#game-modal');
const closeModal = document.querySelector('#close-modal');
const modalTitle = document.querySelector('#modal-title');
const modalImg = document.querySelector('#modal-img');
const modalDesc = document.querySelector('#modal-desc');
const modalGenre = document.querySelector('#modal-genre');
const modalPlatform = document.querySelector('#modal-platform-text');

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
            <div class="rating-container">
    ${generateStars(game.rating)}
</div>
            <button class="details-btn">More Details</button>
        `;

        const button = card.querySelector('.details-btn');
        button.addEventListener('click', () => {
            openModal(game);
        });

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

function openModal(game) {
    modalTitle.textContent = game.name;
    modalImg.src = game.imageUrl;
    modalImg.alt = game.name;
    modalDesc.textContent = game.description;
    modalGenre.textContent = game.genre;
    modalPlatform.textContent = game.platform;
    modal.showModal();
}

closeModal.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

function generateStars(rating) {
    const starPercentage = (rating / 5) * 100;

    return `
        <div class="stars-outer">
            <div class="stars-inner" style="width: ${starPercentage}%"></div>
        </div>
    `;
}

getGames();

