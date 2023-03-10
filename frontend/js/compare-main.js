import { getByCountryKidopi, getCountriesAvailableKidopi } from "./services/kidopi-api-service.js";

const inputSelectCountry1 = document.getElementById("select-country1");
const inputSelectCountry2 = document.getElementById("select-country2");
const spanSelectCountryMessage = document.getElementById("select-country-message");
const btnSelectCountry = document.getElementById("select-country-btn");
const divTableContainer = document.getElementById("table-container");
let totalCasesCountry = 0;
let totalDeathsCountry = 0;
let feeCountry = 0;
const pLoadingMessage = document.getElementById("loading-message");
const tableHeaderElements = ["País", "Casos confirmados", "Mortes confirmadas", "Taxa (%)"];

btnSelectCountry.addEventListener("click", async () => {

    const country1 = inputSelectCountry1.options[inputSelectCountry1.selectedIndex].value;
    const country2 = inputSelectCountry2.options[inputSelectCountry2.selectedIndex].value;
    let isSelectsValid = true;

    spanSelectCountryMessage.classList.add("hide");

    if (country1 === "" || country2 === "") {
        isSelectsValid = false;
        spanSelectCountryMessage.innerText = "Seleciona os dois países!";
        spanSelectCountryMessage.classList.remove("hide");
    }

    if (isSelectsValid) {

        totalCasesCountry = 0;
        totalDeathsCountry = 0;

        divTableContainer.classList.add("hide");
        pLoadingMessage.classList.remove("hide");

        const countries = [country1, country2];
        const countriesData = [];

        for (const key in countries) {

            const result = await getByCountryKidopi(countries[key]);

            for (const key in result) {
                totalCasesCountry += result[key].Confirmados;
                totalDeathsCountry += result[key].Mortos;
            }

            if (totalCasesCountry > 0) {
                feeCountry = totalDeathsCountry / totalCasesCountry;
            }

            const data = {
                'name': countries[key],
                'totalCases': totalCasesCountry,
                'totalDeaths': totalDeathsCountry,
                'fee': feeCountry.toFixed(4)
            }

            countriesData[key] = data;
        }

        createTableCompare(countriesData);
        divTableContainer.classList.remove("hide");
        pLoadingMessage.classList.add("hide");
    }

});

const createSelectCountry = async () => {
    const response = await getCountriesAvailableKidopi();
    for (const key in response) {
        inputSelectCountry1.innerHTML = inputSelectCountry1.innerHTML + `<option value="${response[key]}">${response[key]}</option>`;
        inputSelectCountry2.innerHTML = inputSelectCountry1.innerHTML + `<option value="${response[key]}">${response[key]}</option>`;
    }
}

const createTableCompare = (countriesData) => {

    const table = document.createElement("table");
    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    tableHeaderElements.map((element) => {
        const th = document.createElement("th");
        th.innerText = element;

        tableHeader.appendChild(th);
    });

    for (const key in countriesData) {
        const tr = document.createElement("tr");
        const tdCountry = document.createElement("td");
        const tdCases = document.createElement("td");
        const tdDeaths = document.createElement("td");
        const tdFee = document.createElement("td");

        tdCountry.innerText = countriesData[key].name;
        tdCases.innerText = countriesData[key].totalCases;
        tdDeaths.innerText = countriesData[key].totalDeaths;
        tdFee.innerText = countriesData[key].fee;

        tr.appendChild(tdCountry);
        tr.appendChild(tdCases);
        tr.appendChild(tdDeaths);
        tr.appendChild(tdFee);

        tableBody.appendChild(tr);
    }

    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    divTableContainer.replaceChildren();
    divTableContainer.appendChild(table);
}

createSelectCountry();