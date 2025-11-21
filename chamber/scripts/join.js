const timestampInput = document.getElementById('timestamp');

const now = new Date();
const formattedDate = now.toDateString() + ' ' + now.toLocaleTimeString();

if (timestampInput) {
    timestampInput.value = formattedDate;
}

function setupModal(modalId, openBtnId, closeBtnId) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);

    openBtn.addEventListener('click', () => {
        modal.showModal();
    });

    closeBtn.addEventListener('click', () => {
        modal.close();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

setupModal('np-dialog', 'np-btn', 'close-np');
setupModal('bronze-dialog', 'bronze-btn', 'close-bronze');
setupModal('silver-dialog', 'silver-btn', 'close-silver');
setupModal('gold-dialog', 'gold-btn', 'close-gold');