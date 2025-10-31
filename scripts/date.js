document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    const lmEl = document.getElementById('lm');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lmEl) lmEl.textContent = document.lastModified || 'Unknown';
});