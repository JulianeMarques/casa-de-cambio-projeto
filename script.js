const currencyList = document.querySelector('#currency-list');
const currencyBase = document.querySelector('#currency-base');

async function fetchCurrency(base) { // base = BRL ja deixa como padrao (chamado de parent default)
    const response = await fetch(`https://api.exchangerate.host/latest?base=${base}`); // precisamos adcionar o return para que retorne uma promise ja que estamos dentro de uma funcao
    console.log(response);
    const data = await response.json();
    return data;
};

const addCurrency = ([currency, value]) => { // nesse ponto utilizando [] desestruturamos o array e os valores sao exibidos do jeito que queremos para o usuario
    const newLi = document.createElement('li'); // passa por parametro a li que vamos criar
    newLi.innerText = `${currency}: ${value}`;
    currencyList.appendChild(newLi);
};

const clearCurrencyList = () => {
    currencyList.innerHTML = '';
  }

  const populateCurrencyList = (rates) => {
    Object.entries(rates) // bloquear o padrao do input
    .forEach(addCurrency)
  }
  
/*     fetchCurrency(inputCurrency.value)
        .then(({ base, rates }) => {
            console.log(base);
            console.log(rates);  consoles feitos para entender o que cada um faz/traz
            // console.log(Object.entries(rates)); // transforma o objeto em array com chave e valor
            // Object.entries(rates).forEach((value) => { // exibe bonitinho chave e valor e precisamos de desestruturar o array para pegar cada um dos dados
            currencyBase.innerText = `Valores referentes a 1 ${base}`;
            clearCurrencyList();
            Object.entries(rates).forEach(addCurrency);
            });
        }; */

const clickHandle = async (event) => {
        event.preventDefault();
        const inputCurrency = document.querySelector('#currency-input');
          
        try {
            const baseValue = inputCurrency.value;
             if (baseValue === '') {
             throw new Error('Informe alguma moeda');
            }
            const { base, rates } = await fetchCurrency(baseValue);
              currencyBase.innerText = `Valores referentes a 1 ${base}`;
              clearCurrencyList();
              populateCurrencyList(rates);
            } catch (error) {
              alert(`Deu ruim! ${error}`);
            }
          
          }        

const setupEventHandlers = () => {
    const searchButton = document.querySelector('#search-button'); // pega botao

    searchButton.addEventListener('click', clickHandle);
}



window.onload = () => { // atribuir as funcoes que quero que aparecam para o usuario (boa pratica)
    setupEventHandlers();
}