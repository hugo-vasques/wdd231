const url = "prophets.json";

async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayProphets(data.prophets);
    } catch (error) {
        console.error("Error trying to load the JSON file:", error);
    }
}

function displayProphets(prophets) {
    const cardsContainer = document.querySelector("#cards");

    prophets.forEach((prophet) => {
        let card = document.createElement("section");
        let h2 = document.createElement("h2");
        let portrait = document.createElement("img");
        let birthplace = document.createElement("p");
        let birthdate = document.createElement("p");

        h2.textContent = `${prophet.name} ${prophet.lastname}`;

        birthplace.textContent = `Birthplace: ${prophet.birthplace}`;
        birthdate.textContent = `Birthdate: ${prophet.birthdate}`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(h2);
        card.appendChild(birthplace);
        card.appendChild(birthdate);
        card.appendChild(portrait);

        cardsContainer.appendChild(card);
    });
}

getProphetData();