"use strict";

// import do serviço da API Kidopi
import { getByCountryKidopi } from "./services/kidopi-api-service.js";
// import do serviço da API backend
import { getSelectCountryBackend, getLastSearchBackend, saveCountryBackend } from "./services/backend-api-service.js";

// contâiner dos dados
const dataContainer = document.getElementById("data-table-container");
// select país
const inputSelectCountry = document.getElementById("select-country");
// botão pesquisar
const btnSelectCountry = document.getElementById("select-country-btn");
// span de erro
const spanSelectCountryMessage = document.getElementById("select-country-message");
// mensagem de carregamento
const pLoadingMessage = document.getElementById("loading-message");
// total de casos
const pTotalCases = document.getElementById("total-cases");
// total de mortes
const pTotalDeaths = document.getElementById("total-deaths");
// taxa total
const pTotalFee = document.getElementById("total-fee");
// contâiner da tabela
const divTableContainer = document.getElementById("table-container");
// span da data da última pesquisa
const spanLastSearchDate = document.getElementById("last-search-date");
// span do país da última pesquisa
const spanLastSearchCountry = document.getElementById("last-search-country");
// colunas da tabela
const tableHeaderElements = ["Estado/Província", "Casos confirmados", "Mortes confirmadas", "Taxa (%)"];
// variáveis auxiliares
let totalCases = 0;
let totalDeaths = 0;
let totalFee = 0;

// evento de click do botão
btnSelectCountry.addEventListener("click", async () => {

    // pega o valor do select
    const country = inputSelectCountry.options[inputSelectCountry.selectedIndex].value;

    // esconde span de erro
    spanSelectCountryMessage.classList.add("hide");

    // valida se tem algum país selecionado
    if (country !== "") {

        // limpar interval da mensagem de erro
        clearInterval(hideMessage);

        // esconde o contâiner dos dados
        dataContainer.classList.add("hide");
        // exibe mensagem de carregamento
        pLoadingMessage.classList.remove("hide");

        // busca os dados do país na API da Kidopi
        const result = await getByCountryKidopi(country);
        // chama a função que cria a tabela passando o resultado como parâmetro
        createTableSearch(result);
        // chama a função que busca a última consulta
        createLastSearch();

        // exibe o contâiner com os dados
        dataContainer.classList.remove("hide");
        // exconde mensagem de carregamento
        pLoadingMessage.classList.add("hide");

        // salva a consulta realizada no backend passando o país como parâmetro
        saveCountryBackend(country);
    } else {
        // adiciona mensagem no span de erro
        spanSelectCountryMessage.innerText = "Selecione um país!";
        // exibe o span de erro
        spanSelectCountryMessage.classList.remove("hide");
        // chama o setInterval para esconder a mensagem depois do tempo definido
        hideMessage;
    }

});

// função para popular o select
const createSelectCountry = async () => {

    // consulta os dados na API backend
    const result = await getSelectCountryBackend();

    // valida o resultado
    if (result.status) {
        // pega os resultados e popula o select
        result.data.map((element) => {
            inputSelectCountry.innerHTML = inputSelectCountry.innerHTML + `<option value="${element.country}">${element.country}</option>`;
        });
    } else {
        // adiciona mensagem de erro no span
        spanSelectCountryMessage.innerText = result.message;
        // exibe o span de erro
        spanSelectCountryMessage.classList.remove("hide");
    }
}

// função que monta o footer com a última pesquisa
const createLastSearch = async () => {

    // faz a pesquisa no backend
    const result = await getLastSearchBackend();

    // valida se teve retorno
    if (result.status) {
        // contante para auxiliar formatação da data
        const date = new Date(result.date);
        // formata a data no padrão brasileiro e insere no span
        spanLastSearchDate.innerText = date.toLocaleString("pt-BR");
        // insere o nome do país no span
        spanLastSearchCountry.innerText = result.country;
    }
}

// funcção que cria a tabela
const createTableSearch = (result) => {

    // zera as variáveis auxiliares
    totalCases = 0;
    totalDeaths = 0;
    totalFee = 0;

    // cria um elemento table
    const table = document.createElement("table");
    // adiciona a classe no elemento table
    table.classList.add("table-content");
    // cria um elemento thead
    const tableHeader = document.createElement("thead");
    // cria um elemento tr da thead
    const tableHeaderTR = document.createElement("tr");
    // cria um elemento tbody
    const tableBody = document.createElement("tbody");

    // cria a linha de colunas da tabela
    tableHeaderElements.map((element) => {
        // cria um elemento th
        const th = document.createElement("th");
        // adiciona o valor na th
        th.innerText = element;
        // adiciona a th no tr da thead
        tableHeaderTR.appendChild(th);
    });

    // adiciona o tr no thead
    tableHeader.appendChild(tableHeaderTR);

    // itera os resultados da pesquisa para criar as linhas da tabela
    for (const key in result) {
        // cria a td da província / estado
        const tdProvinceState = document.createElement("td");
        // cria a td dos casos
        const tdCases = document.createElement("td");
        // cria a td das mortes
        const tdDeaths = document.createElement("td");
        // cria a td da taxa
        const tdFee = document.createElement("td");
        // cria a tr
        const tr = document.createElement("tr");
        // variável auxiliar para cálculo da taxa
        let fee = 0;

        // adiciona o valor na td provincia / estado
        tdProvinceState.innerText = result[key].ProvinciaEstado;
        // adiciona o valor na td dos casos
        tdCases.innerText = result[key].Confirmados.toLocaleString();
        // adiciona o valor na td das mortes
        tdDeaths.innerText = result[key].Mortos.toLocaleString();
        // valida se os casos são maores que zero
        if (result[key].Confirmados > 0) {
            // calcula a porcentagem de mortes por casos
            fee = result[key].Mortos / result[key].Confirmados * 100;
        }

        // atribui o valor da taxa com quatro casas decimais
        tdFee.innerText = fee.toFixed(4);
        // soma o total de casos
        totalCases += result[key].Confirmados;
        // soma o total de mortes
        totalDeaths += result[key].Mortos;

        // adiciona as tds no tr
        tr.appendChild(tdProvinceState);
        tr.appendChild(tdCases);
        tr.appendChild(tdDeaths);
        tr.appendChild(tdFee);

        // adiciona o tr no tbody
        tableBody.appendChild(tr);
    }

    // calcula a porcentagem da taxa total
    totalFee = totalDeaths / totalCases * 100;

    // adiciona o valor do total de casos no campo
    pTotalCases.innerText = `Total de casos: ${totalCases.toLocaleString()}`;
    // adiciona o valor do total de mortes no campo
    pTotalDeaths.innerText = `Total de mortes: ${totalDeaths.toLocaleString()}`;
    // adiciona o valor da taxa total no campo
    pTotalFee.innerText = `Taxa total(%): ${totalFee.toFixed(2)}`;

    // adiciona o thead na tabela
    table.appendChild(tableHeader);
    // adiciona o tbody na tabela
    table.appendChild(tableBody);

    // limpa o conteúdo do contâiner da tabela
    divTableContainer.replaceChildren();
    // adiciona a tabela no contâiner
    divTableContainer.appendChild(table);
}

// setInterval para esconder a mensagem depois de quatro segundos
const hideMessage = setInterval(() => {
    spanSelectCountryMessage.classList.add("hide");
}, 4000);

// chama a função para popular o select
createSelectCountry();
// chama a função para montar o footer
createLastSearch();