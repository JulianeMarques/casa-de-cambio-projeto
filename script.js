fetch('https://api.exchangerate.host/latest?base=BRL')
    .then((response) => response.json())
    .then(({ base, rates }) => console.log(base, rates));

function setupEventHandlers() {
    const searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', () => {

    });
};

window.onload = () => {
    setupEventHandlers();
}