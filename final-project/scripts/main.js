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
    menuButton.textContent = navigation.classList.contains('open') ? 'X' : '≡';
});

async function getGames() {
    try {
        const response = await fetch('data/games.json');
        if (response.ok) {
            allGames = await response.json();
            displayGames(allGames);
        } else {
            console.error("Error while loading the JSON file");
        }
    } catch (error) {
        console.error("Connection error or sintaxis:", error);
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
    modalPlatform.innerHTML = `${game.platform} ${getPlatformIcons(game.platform)}`;
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

// --- System of Platform Icons ---
const icons = {
    pc: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>`,
    mobile: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>`,
    playstation: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M21.57 13.92l-.39-2.03c-.15-.79-.8-1.39-1.6-1.48l-2.73-.29c-.89-.09-1.72.33-2.19 1.09l-.73 1.18c-.37.6-.19 1.39.41 1.76l2.15 1.33c.6.37 1.39.19 1.76-.41l.73-1.18c.17-.28.27-.59.29-.91l.39 2.03c.15.79.8 1.39 1.6 1.48l2.73.29c.89.09 1.72-.33 2.19-1.09l.73-1.18c.37-.6.19-1.39-.41-1.76l-2.15-1.33c-.6-.37-1.39-.19-1.76.41l-.73 1.18c-.17.28-.27.59-.29.91zM2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2 2 6.48 2 12zm10 6c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>`, 
    xbox: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.07 15.07L12 13l-4.07 4.07-1.41-1.41L10.59 11.59 6.52 7.52l1.41-1.41L12 10.17l4.07-4.07 1.41 1.41L13.41 11.59l4.07 4.07-1.41 1.41z"/></svg>`,
    nintendo: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M20.13 4.2C19.5 3.5 18.5 3 17.5 3H6.5c-1 0-2 .5-2.63 1.2C3.34 4.8 3 5.6 3 6.5v11c0 .9.34 1.7.87 2.3.63.7 1.63 1.2 2.63 1.2h11c1 0 2-.5 2.63-1.2.53-.6.87-1.4.87-2.3v-11c0-.9-.34-1.7-.87-2.3zM8 16.5c-1.38 0-2.5-1.12-2.5-2.5S6.62 11.5 8 11.5s2.5 1.12 2.5 2.5S9.38 16.5 8 16.5zm8 0c-1.38 0-2.5-1.12-2.5-2.5S14.62 11.5 16 11.5s2.5 1.12 2.5 2.5S17.38 16.5 16 16.5z"/></svg>`, 
    generic: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>` // Gamepad clásico
};

function getPlatformIcons(platformString) {
    if (!platformString) return '';

    const lowerStr = platformString.toLowerCase();
    let iconsHTML = `<span class="platform-icons-container">`;

    if (lowerStr.includes('pc') || lowerStr.includes('windows') || lowerStr.includes('mac')) {
        iconsHTML += icons.pc;
    }

    if (lowerStr.includes('mobile') || lowerStr.includes('android') || lowerStr.includes('ios')) {
        iconsHTML += icons.mobile;
    }

    if (lowerStr.includes('playstation') || lowerStr.includes('ps4') || lowerStr.includes('ps5')) {
        iconsHTML += icons.playstation;
    }

    if (lowerStr.includes('xbox')) {
        iconsHTML += icons.xbox;
    }

    if (lowerStr.includes('nintendo') || lowerStr.includes('switch') || lowerStr.includes('wii') || lowerStr.includes('64')) {
        iconsHTML += icons.nintendo;
    }

    if (iconsHTML === `<span class="platform-icons-container">`) {
        iconsHTML += icons.generic;
    }

    iconsHTML += `</span>`;
    return iconsHTML;
}

getGames();

