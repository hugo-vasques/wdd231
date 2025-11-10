const directoryContainer = document.querySelector('#directoryContainer');
const gridBtn = document.querySelector('#gridBtn');
const listBtn = document.querySelector('#listBtn');

let businesses = [];

async function getBusinesses() {
    const response = await fetch('./data/members.json');
    const data = await response.json();
    businesses = data;
    displayGrid();
}

getBusinesses();

function displayGrid() {
    directoryContainer.innerHTML = '';

    businesses.forEach(biz => {
        const card = document.createElement('section');
        card.classList.add('card');

        const membershipNames = {
            1: "Bronze",
            2: "Silver",
            3: "Gold"
        };

        const membershipText = membershipNames[biz.membership];

        card.classList.add(membershipText.toLowerCase());

        const imageSrc = biz.image && biz.image.trim() !== "" ? biz.image : "images/placeholder.png";

        card.innerHTML = `
        <div class="img-box">
            <img src="${imageSrc}" alt="${biz.name}">
        </div>
      <h2>${biz.name}</h2>
      <p>${biz.address}</p>
      <p>${biz.phone}</p>
      <p class="membership-tag">Membership: ${membershipText}</p>

      <a href="${biz.website}" target="_blank" class="cta-btn">Visit Website</a>
    `;

        directoryContainer.appendChild(card);
    });

    directoryContainer.classList.add('grid');
    directoryContainer.classList.remove('list');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');

}

function displayList() {
    directoryContainer.innerHTML = '';

    businesses.forEach(biz => {
        const row = document.createElement('section');
        row.classList.add('list-item');

        row.innerHTML = `
      <h2>${biz.name}</h2>
      <p>${biz.phone}</p>
      <a href="${biz.website}" target="_blank">Visit Website</a>
    `;

        directoryContainer.appendChild(row);
    });

    directoryContainer.classList.add('list');
    directoryContainer.classList.remove('grid');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
}

gridBtn.addEventListener('click', displayGrid);
listBtn.addEventListener('click', displayList);