const currentUrl = window.location.href;
const everything = currentUrl.split('?');

if (everything.length > 1) {
    const formData = everything[1].split('&');
    const showInfo = document.querySelector('#results');

    let resultHTML = '<ul>';

    formData.forEach((element) => {
        const key = element.split('=')[0];
        const value = decodeURIComponent(element.split('=')[1].replace(/\+/g, " "));

        if (value) {
            resultHTML += `<li><strong>${key}:</strong> ${value}</li>`;
        }
    });

    resultHTML += '</ul>';
    showInfo.innerHTML = resultHTML;
}