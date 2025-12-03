const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');
const gamesContainer = document.querySelector('#games-container');
const yearSpan = document.querySelector('#year');
const searchBar = document.querySelector('#search-bar');

// Referencias del Modal
const modal = document.querySelector('#game-modal');
const closeModal = document.querySelector('#close-modal');
const modalTitle = document.querySelector('#modal-title');
const modalImg = document.querySelector('#modal-img');
const modalDesc = document.querySelector('#modal-desc');
const modalGenre = document.querySelector('#modal-genre');
const modalPlatform = document.querySelector('#modal-platform-text');

let allGames = [];

// Poner año actual
const today = new Date();
yearSpan.textContent = today.getFullYear();

// Menú Hamburguesa
menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.textContent = navigation.classList.contains('open') ? '❌' : '🍔';
});

// Obtener juegos
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

// Mostrar juegos (CORREGIDO AQUI)
const displayGames = (games) => {
    gamesContainer.innerHTML = "";

    if (games.length === 0) {
        gamesContainer.innerHTML = "<p>No games found matching your search.</p>";
        return;
    }

    games.forEach((game) => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Creamos el HTML interno
        card.innerHTML = `
            <img src="${game.imageUrl}" alt="${game.name}" loading="lazy" width="300" height="200">
            <h3>${game.name}</h3>
            <p class="genre">${game.genre}</p>
            <p class="rating">⭐ ${game.rating}</p>
            <button class="details-btn">More Details</button>
        `;

        // --- CORRECCIÓN IMPORTANTE ---
        // Agregamos el evento click al botón que acabamos de crear
        const button = card.querySelector('.details-btn');
        button.addEventListener('click', () => {
            openModal(game);
        });
        // -----------------------------

        gamesContainer.appendChild(card);
    });
}

// Búsqueda
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = allGames.filter(game =>
        game.name.toLowerCase().includes(searchTerm) ||
        game.genre.toLowerCase().includes(searchTerm)
    );
    displayGames(filteredGames);
});

// Función para abrir el modal
function openModal(game) {
    modalTitle.textContent = game.name;
    modalImg.src = game.imageUrl;
    modalImg.alt = game.name;
    modalDesc.textContent = game.description;
    modalGenre.textContent = game.genre;
    modalPlatform.textContent = game.platform;
    modal.showModal();
}

// Cerrar modal con botón X
closeModal.addEventListener('click', () => {
    modal.close();
});

// Cerrar modal clickeando fuera
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

// Iniciar
getGames();

