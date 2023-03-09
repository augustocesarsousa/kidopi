import { getByCountryKidopi } from "./services/kidopi-api-service.js";
import { getSelectCountryBackend, getLastSearchBackend, saveCountryBackend } from "./services/backend-api-service.js";

const inputSelectCountry = document.getElementById("select-country");
const btnSelectCountry = document.getElementById("select-country-btn");
const spanSelectCountryMessage = document.getElementById("select-country-message");
const pLoadingMessage = document.getElementById("loading-message");
const pTotalCases = document.getElementById("total-cases");
const pTotalDeaths = document.getElementById("total-deaths");
const divTableContainer = document.getElementById("table-container");
const pLastSearchContent = document.getElementById("last-search-content");
const spanLastSearchDate = document.getElementById("last-search-date");
const spanLastSearchCountry = document.getElementById("last-search-country");
const tableHeaderElements = ["Estado/Província", "Casos confirmados", "Mortes confirmadas", "Taxa (%)"];
let totalCases = 0;
let totalDeaths = 0;

btnSelectCountry.addEventListener("click", async () => {

    let country = inputSelectCountry.options[inputSelectCountry.selectedIndex].value;
    spanSelectCountryMessage.classList.add("hide");

    if (country !== "") {

        pTotalCases.classList.add("hide");
        pTotalDeaths.classList.add("hide");
        divTableContainer.classList.add("hide");
        pLoadingMessage.classList.remove("hide");

        const result = await getByCountryKidopi(country);
        createTableSearch(result);

        pTotalCases.classList.remove("hide");
        pTotalDeaths.classList.remove("hide");
        divTableContainer.classList.remove("hide");
        pLoadingMessage.classList.add("hide");

        saveCountryBackend(country);
    } else {
        spanSelectCountryMessage.innerText = "Selecione um país!";
        spanSelectCountryMessage.classList.remove("hide");
    }

});

const createSelectCountry = async () => {

    const result = await getSelectCountryBackend();
    if (result.status) {
        spanSelectCountryMessage.classList.add("hide");
        result.data.map((element) => {
            inputSelectCountry.innerHTML = inputSelectCountry.innerHTML + `<option value="${element.country}">${element.country}</option>`;
        });
    } else {
        spanSelectCountryMessage.innerText = result.message;
        spanSelectCountryMessage.classList.remove("hide");
    }
}

const createLastSearch = async () => {

    const result = await getLastSearchBackend();
    if (result.status) {
        const date = new Date(result.date);
        spanLastSearchDate.innerText = date.toLocaleString("pt-BR");
        spanLastSearchCountry.innerText = result.country;
        pLastSearchContent.classList.remove("hide");
    }
}

const createTableSearch = (result) => {

    const table = document.createElement("table");
    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    tableHeaderElements.map((element) => {
        const th = document.createElement("th");
        th.innerText = element;

        tableHeader.appendChild(th);
    });

    for (const key in result) {
        const tdProvinciaEstado = document.createElement("td");
        const tdCases = document.createElement("td");
        const tdDeaths = document.createElement("td");
        const tdFee = document.createElement("td");
        const tr = document.createElement("tr");
        let fee = 0;

        tdProvinciaEstado.innerText = result[key].ProvinciaEstado;
        tdCases.innerText = result[key].Confirmados;
        tdDeaths.innerText = result[key].Mortos;
        if (result[key].Confirmados > 0) {
            fee = result[key].Mortos / result[key].Confirmados;
        }
        tdFee.innerText = fee.toFixed(4);

        totalCases += result[key].Confirmados;
        totalDeaths += result[key].Mortos;

        tr.appendChild(tdProvinciaEstado);
        tr.appendChild(tdCases);
        tr.appendChild(tdDeaths);
        tr.appendChild(tdFee);

        tableBody.appendChild(tr);
    }

    pTotalCases.innerText = `Total de casos: ${totalCases}`;
    pTotalDeaths.innerText = `Total de mortes: ${totalDeaths}`;

    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    divTableContainer.replaceChildren();
    divTableContainer.appendChild(table);
}

createSelectCountry();
createLastSearch();