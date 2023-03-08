const baseUrl = "https://dev.kidopilabs.com.br/exercicio/covid.php?";
const inputSelectCountry = document.getElementById("select-country");
const pLoadingMessage = document.getElementById("loading-message");
const pTotalCases = document.getElementById("total-cases");
const pTotalDeats = document.getElementById("total-deats");
const divTableContainer = document.getElementById("table-container");
const pLastSeachContent = document.getElementById("last-seach-content");
const spanLastSeachDate = document.getElementById("last-seach-date");
const spanLastSeachCountry = document.getElementById("last-seach-country");
const tableHeaderElements = ["Estado/Província", "Casos confirmados", "Mortes confirmadas"];
let contTotalCasos = 0;
let contTotalMortes = 0;

const selectCountry = async () => {

    let country = inputSelectCountry.options[inputSelectCountry.selectedIndex].value;
    if (country !== "") {

        pTotalCases.classList.add("hide");
        pTotalDeats.classList.add("hide");
        divTableContainer.classList.add("hide");
        pLoadingMessage.classList.remove("hide");

        const data = await getByCountryAPI(country);
        createTable(data);

        pTotalCases.classList.remove("hide");
        pTotalDeats.classList.remove("hide");
        divTableContainer.classList.remove("hide");
        pLoadingMessage.classList.add("hide");

        saveCountry(country);
    }
}

const getByCountryAPI = async (country) => {

    const response = await fetch(baseUrl + "pais=" + country);
    return response.json();
}

const saveCountry = async (country) => {

    const formData = new FormData();
    formData.append('country', country);

    const response = await fetch("save_country.php", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    console.log(result.message);

}

const getLastSeach = async () => {

    const response = await fetch("get_last_seach.php");
    const data = await response.json();
    if (data.status) {
        const date = new Date(data.date);
        spanLastSeachDate.innerText = date.toLocaleString();
        spanLastSeachCountry.innerText = data.country;
        pLastSeachContent.classList.remove("hide");
    }

}

const createTable = (data) => {

    const table = document.createElement("table");
    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    tableHeaderElements.map((element) => {
        const th = document.createElement("th");
        th.innerText = element;

        tableHeader.appendChild(th);
    })

    for (const key in data) {
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const tr = document.createElement("tr");

        td1.innerText = data[key].ProvinciaEstado;
        td2.innerText = data[key].Confirmados;
        td3.innerText = data[key].Mortos;

        contTotalCasos += data[key].Confirmados;
        contTotalMortes += data[key].Mortos;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tableBody.appendChild(tr);
    }

    pTotalCases.innerText = `Total de casos: ${contTotalCasos}`;
    pTotalDeats.innerText = `Total de mortes: ${contTotalMortes}`;

    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    divTableContainer.replaceChildren();
    divTableContainer.appendChild(table);
}

getLastSeach();