import { getByCountryKidopi, getCountriesAvailableKidopi } from "./services/kidopi-api-service.js";

const inputSelectCountry1 = document.getElementById("select-country1");
const inputSelectCountry2 = document.getElementById("select-country2");
const spanSelectCountryMessage = document.getElementById("select-country-message");
const btnSelectCountry = document.getElementById("select-country-btn");
const divGraphicContainer = document.getElementById("graphic-container");
const legentText1 = document.getElementById("legent-text1");
const legentText2 = document.getElementById("legent-text2");
const totalCasesBarNumber1 = document.getElementById("total-cases-bar-number1");
const totalCasesBarNumber2 = document.getElementById("total-cases-bar-number2");
const totalCasesBar1 = document.getElementById("total-cases-bar1");
const totalCasesBar2 = document.getElementById("total-cases-bar2");
const totalDeathsBarNumber1 = document.getElementById("total-deaths-bar-number1");
const totalDeathsBarNumber2 = document.getElementById("total-deaths-bar-number2");
const totalDeathsBar1 = document.getElementById("total-deaths-bar1");
const totalDeathsBar2 = document.getElementById("total-deaths-bar2");
const totalFeeBarNumber1 = document.getElementById("total-fee-bar-number1");
const totalFeeBarNumber2 = document.getElementById("total-fee-bar-number2");
const totalFeeBar1 = document.getElementById("total-fee-bar1");
const totalFeeBar2 = document.getElementById("total-fee-bar2");
const maxTotalCases = 50000000;
const maxTotalDeaths = 1000000;
const maxTotalFee = 1;
let totalCasesCountry = 0;
let totalDeathsCountry = 0;
let totalFeeCountry = 0;
const pLoadingMessage = document.getElementById("loading-message");

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

        divGraphicContainer.classList.add("hide");
        pLoadingMessage.classList.remove("hide");

        const countries = [country1, country2];
        const countriesData = [];

        for (const key in countries) {

            totalCasesCountry = 0;
            totalDeathsCountry = 0;
            totalFeeCountry = 0;

            const result = await getByCountryKidopi(countries[key]);

            for (const key in result) {
                totalCasesCountry += result[key].Confirmados;
                totalDeathsCountry += result[key].Mortos;

                if (result[key].Confirmados > 0) {
                    totalFeeCountry += result[key].Mortos / result[key].Confirmados;
                }
            }

            const data = {
                'name': countries[key],
                'totalCases': totalCasesCountry,
                'totalDeaths': totalDeathsCountry,
                'totalFee': totalFeeCountry.toFixed(4)
            }

            countriesData[key] = data;
        }

        createGraphic(countriesData);
        divGraphicContainer.classList.remove("hide");
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

const createGraphic = (countriesData) => {

    legentText1.innerText = countriesData[0].name;
    legentText2.innerText = countriesData[1].name;

    totalCasesBarNumber1.innerText = (countriesData[0].totalCases).toLocaleString();
    totalCasesBarNumber2.innerText = (countriesData[1].totalCases).toLocaleString();
    totalCasesBar1.style.height = (countriesData[0].totalCases / maxTotalCases * 100).toFixed(2) + "%";
    totalCasesBar2.style.height = (countriesData[1].totalCases / maxTotalCases * 100).toFixed(2) + "%";
    
    totalDeathsBarNumber1.innerText = (countriesData[0].totalDeaths).toLocaleString();
    totalDeathsBarNumber2.innerText = (countriesData[1].totalDeaths).toLocaleString();
    totalDeathsBar1.style.height = (countriesData[0].totalDeaths / maxTotalDeaths * 100).toFixed(2) + "%";
    totalDeathsBar2.style.height = (countriesData[1].totalDeaths / maxTotalDeaths * 100).toFixed(2) + "%";
    
    totalFeeBarNumber1.innerText = (countriesData[0].totalFee).toLocaleString();
    totalFeeBarNumber2.innerText = (countriesData[1].totalFee).toLocaleString();
    totalFeeBar1.style.height = (countriesData[0].totalFee / maxTotalFee * 100) + "%";
    totalFeeBar2.style.height = (countriesData[1].totalFee / maxTotalFee * 100) + "%";
}

createSelectCountry();