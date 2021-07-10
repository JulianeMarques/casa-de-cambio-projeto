/* fetch('https://api.exchangerate.host/latest?base=BRL')
    .then((respose) => respose.json())
    .then(({ base, rates }) => console.log(base, rates)) */ 
// essa ultima parte da funcao acima nao precisa ser incluida na funcao fetchCurrency pois la so queremos retornar os dados do JSON

function fetchCurrency(base = 'BRL') { // base = BRL ja deixa como padrao (chamado de parent default)
    return fetch(`https://api.exchangerate.host/latest?base=${base}`) // precisamos adcionar o return para que retorne uma promise ja que estamos dentro de uma funcao
    .then((respose) => respose.json());
};

const setupEventHandlers = () => {
    const searchButton = document.querySelector('#search-button'); // pega botao

    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); // bloquear o padrao do input
        const inputCurrency = document.querySelector('#currency-input'); // pega o input
        fetchCurrency(inputCurrency.value)
            .then(({ base, rates }) => {
                /* console.log(base);
                console.log(rates);  consoles feitos para entender o que cada um faz/traz */
                // console.log(Object.entries(rates)); // transforma o objeto em array com chave e valor
                //Object.entries(rates).forEach((value) => { // exibe bonitinho chave e valor e precisamos de desestruturar o array para pegar cada um dos dados
                Object.entries(rates).forEach(([currency, value]) => { // nesse ponto utilizando [] desestruturamos o array e os valores sao exibidos do jeito que queremos para o usuario
                    const currencyList = document.querySelector('#currency-list');
                    const newLi = document.createElement('li'); // passa por parametro a li que vamos criar
                    newLi.innerText = `${currency}: ${value}`;
                    currencyList.appendChild(newLi);
                    console.log(currency, value);
                });
                });
            });
    };



    window.onload = () => { // atribuir as funcoes que quero que aparecam para o usuario (boa pratica)
    setupEventHandlers();
    fetchCurrency();
    };