"use strick";

import { getByCountryKidopi, getCountriesAvailableKidopi } from "./services/kidopi-api-service.js";

// select país 1
const inputSelectCountry1 = document.getElementById("select-country1");
// select país 2
const inputSelectCountry2 = document.getElementById("select-country2");
// span de mensagem
const spanSelectCountryMessage = document.getElementById("select-country-message");
// botão de pesquisa
const btnSelectCountry = document.getElementById("select-country-btn");
// contâiner dos gráficos
const divGraphicContainer = document.getElementById("graphic-container");
// legenda 1
const legentText1 = document.getElementById("legent-text1");
// legenda 2
const legentText2 = document.getElementById("legent-text2");
// div escala Y do gráfico total de casos
const totalCasesScaleY = document.getElementById("total-cases-scale-y");
// legenda da barra 1 do gráfico total de casos
const totalCasesBarNumber1 = document.getElementById("total-cases-bar-legend1");
// legenda da barra 2 do gráfico total de casos
const totalCasesBarNumber2 = document.getElementById("total-cases-bar-legend2");
// barra 1 do gráfico total de casos
const totalCasesBar1 = document.getElementById("total-cases-bar1");
// barra 2 do gráfico total de casos
const totalCasesBar2 = document.getElementById("total-cases-bar2");
// div escala Y do gráfico total de mortes
const totalDeathsScaleY = document.getElementById("total-deaths-scale-y");
// legenda da barra 1 do gráfico total de mortes
const totalDeathsBarNumber1 = document.getElementById("total-deaths-bar-legend1");
// legenda da barra 2 do gráfico total de mortes
const totalDeathsBarNumber2 = document.getElementById("total-deaths-bar-legend2");
// barra 1 do gráfico total de mortes
const totalDeathsBar1 = document.getElementById("total-deaths-bar1");
// barra 2 do gráfico total de mortes
const totalDeathsBar2 = document.getElementById("total-deaths-bar2");
// div escala Y do gráfico taxa total
const totalFeeScaleY = document.getElementById("total-fee-scale-y");
// legenda da barra 1 do gráfico taxa total
const totalFeeBarNumber1 = document.getElementById("total-fee-bar-legend1");
// legenda da barra 2 do gráfico taxa total
const totalFeeBarNumber2 = document.getElementById("total-fee-bar-legend2");
// barra 1 do gráfico taxa total
const totalFeeBar1 = document.getElementById("total-fee-bar1");
// barra 2 do gráfico taxa total
const totalFeeBar2 = document.getElementById("total-fee-bar2");
// atributos do objeto país
let totalCasesCountry = 0;
let totalDeathsCountry = 0;
let totalFeeCountry = 0;
// mensagem de carregamento
const pLoadingMessage = document.getElementById("loading-message");

// evento click do botão de pesquisa
btnSelectCountry.addEventListener("click", async () => {

    // pega os valores dos selects
    const country1 = inputSelectCountry1.options[inputSelectCountry1.selectedIndex].value;
    const country2 = inputSelectCountry2.options[inputSelectCountry2.selectedIndex].value;

    // esconde mensagem de validação dos países selecionados
    spanSelectCountryMessage.classList.add("hide");

    // valida os países selecionados
    if (country1 === "" || country2 === "") {
        // adciona texto no span de mensagem
        spanSelectCountryMessage.innerText = "Seleciona os dois países!";
        // exibe mensagem de validação dos países selecionados
        spanSelectCountryMessage.classList.remove("hide");
    } else {

        // limpa o setInterval
        clearInterval(hideMessage);

        // esconde contâiner dos gráficos
        divGraphicContainer.classList.add("hide");
        // exibe mensagem de carregamento
        pLoadingMessage.classList.remove("hide");

        // cria lista dos países
        const countries = [country1, country2];

        // cria lista vazia dos dados dos países
        const countriesData = [];

        // loop para consultar e montar os dados dos países
        for (const key in countries) {

            // zera atributos
            totalCasesCountry = 0;
            totalDeathsCountry = 0;
            totalFeeCountry = 0;

            // consulta país na API
            const result = await getByCountryKidopi(countries[key]);

            // adiciona resultado nos atributos
            for (const key in result) {
                totalCasesCountry += result[key].Confirmados;
                totalDeathsCountry += result[key].Mortos;
            }

            // calcula taxa de mortes
            totalFeeCountry = totalDeathsCountry / totalCasesCountry * 100;

            // cria objeto dados do país
            const data = {
                'name': countries[key],
                'totalCases': totalCasesCountry,
                'totalDeaths': totalDeathsCountry,
                'totalFee': totalFeeCountry.toFixed(2)
            }

            // adiciona objeto na lista de dados
            countriesData[key] = data;
        }

        // chama função para criar os gráficos
        createGraphic(countriesData);

        // exime contâiner dos gráficos
        divGraphicContainer.classList.remove("hide");
        // esconde mensagem de carregamento 
        pLoadingMessage.classList.add("hide");
    }

});

// popula os selects
const createSelectCountry = async () => {

    // consulta os países disponíveis na API
    const response = await getCountriesAvailableKidopi();

    // adiciona o retorno nos selects
    for (const key in response) {
        inputSelectCountry1.innerHTML = inputSelectCountry1.innerHTML + `<option value="${response[key]}">${response[key]}</option>`;
        inputSelectCountry2.innerHTML = inputSelectCountry1.innerHTML + `<option value="${response[key]}">${response[key]}</option>`;
    }
}

// cria os gráficos
const createGraphic = (countriesData) => {
    //TODO criar loop

    // adiciona o nome dos países nas legendas
    legentText1.innerText = countriesData[0].name;
    legentText2.innerText = countriesData[1].name;

    // inicia o valor da escala Y em 5 mil para calcular a escala Y do gráfico de total de casos
    let yScaleValue = 5000;

    // pegar o maior valor de total de casos 
    let maxColValue = countriesData[0].totalCases > countriesData[1].totalCases ? countriesData[0].totalCases : countriesData[1].totalCases;

    // ajusta o valor da escala pelo maior valor de total de casos
    yScaleValue = adjustScaleY(yScaleValue, maxColValue);

    // criando a escala Y
    createScaleY(yScaleValue, totalCasesScaleY);

    // adiciona o valor no topo na coluna
    totalCasesBarNumber1.innerText = (countriesData[0].totalCases).toLocaleString();
    totalCasesBarNumber2.innerText = (countriesData[1].totalCases).toLocaleString();

    // adiciona o valor da porcentagem da coluna
    totalCasesBar1.style.height = (countriesData[0].totalCases / yScaleValue * 100).toFixed(2) + "%";
    totalCasesBar2.style.height = (countriesData[1].totalCases / yScaleValue * 100).toFixed(2) + "%";

    // reseta o valor da escala Y para 5 mil
    yScaleValue = 5000;

    // pegar o maior valor de total de mortes 
    maxColValue = countriesData[0].totalDeaths > countriesData[1].totalDeaths ? countriesData[0].totalDeaths : countriesData[1].totalDeaths;

    // ajusta o valor da escala pelo maior valor de total de mortes
    yScaleValue = adjustScaleY(yScaleValue, maxColValue);

    // criando a escala Y
    createScaleY(yScaleValue, totalDeathsScaleY);

    // adiciona o valor no topo na coluna
    totalDeathsBarNumber1.innerText = (countriesData[0].totalDeaths).toLocaleString();
    totalDeathsBarNumber2.innerText = (countriesData[1].totalDeaths).toLocaleString();

    // adiciona o valor da porcentagem da coluna
    totalDeathsBar1.style.height = (countriesData[0].totalDeaths / yScaleValue * 100).toFixed(2) + "%";
    totalDeathsBar2.style.height = (countriesData[1].totalDeaths / yScaleValue * 100).toFixed(2) + "%";

    // reseta o valor da escala Y para 0.5
    yScaleValue = 0.5;

    // pegar o maior valor da taxa 
    maxColValue = countriesData[0].totalFee > countriesData[1].totalFee ? countriesData[0].totalFee : countriesData[1].totalFee;

    // ajusta o valor da escala pelo maior valor da taxa
    yScaleValue = adjustScaleY(yScaleValue, maxColValue);

    // criando a escala Y
    createScaleY(yScaleValue, totalFeeScaleY);

    // adiciona o valor no topo na coluna
    totalFeeBarNumber1.innerText = (countriesData[0].totalFee).toLocaleString();
    totalFeeBarNumber2.innerText = (countriesData[1].totalFee).toLocaleString();

    // adiciona o valor da porcentagem da coluna
    totalFeeBar1.style.height = (countriesData[0].totalFee / yScaleValue * 100) + "%";
    totalFeeBar2.style.height = (countriesData[1].totalFee / yScaleValue * 100) + "%";
}

// ajusta o valor da escala Y
const adjustScaleY = (yScaleValue, maxColValue) => {

    // variável para auxílio de cáculo
    let yValue = yScaleValue;

    // enquanto o valor da escala for menor que o valor da coluna, acrescenta o valor
    while (yValue < maxColValue) {
        yValue += yScaleValue;
    }

    // retorna valor ajustado
    return yValue;
}

// cria a escala Y
const createScaleY = (yScaleValue, scaleY, percent = 0.0) => {

    // reseta os valores da div
    scaleY.replaceChildren();

    // loop para criar os 6 valores
    for (let i = 1; i < 7; i++) {

        // cria o parágrafo
        const p = document.createElement("p");
        // adiciona a classe division
        p.classList.add("division");

        // verifica se é o útimo loop
        if (i < 6) {
            // calcula o valor da escala no indice i
            p.innerText = (yScaleValue - (yScaleValue * percent)).toLocaleString();
        } else {
            // último valor recebe 0
            p.innerText = 0;
        }

        // adiciona o parágrafo na div
        scaleY.appendChild(p);

        // acrescenta 20% para o próximo loop
        percent += 0.2;
    }
}

// esconde mensagem de erro
const hideMessage = setInterval(() => {
    spanSelectCountryMessage.classList.add("hide");
}, 4000);

// chama função para popular os selects
createSelectCountry();