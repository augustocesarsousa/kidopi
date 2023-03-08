const baseUrl = "https://dev.kidopilabs.com.br/exercicio/covid.php?";
const selectCountry = document.getElementById("select-country");
const loadingMessage = document.getElementById("loading-message");
const totalCases = document.getElementById("total-cases");
const totalDeats = document.getElementById("total-deats");
let contTotalCasos = 0;
let contTotalMortes = 0;
const tableContainer = document.getElementById("table-container");
const tableHeaderElements = ["Estado/Província", "Casos confirmados", "Mortes confirmadas"];

async function getByCountry() {

    let country = selectCountry.options[selectCountry.selectedIndex].value;
    if (country !== "") {

        const table = document.createElement("table");
        const tableHeader = document.createElement("thead"); ""
        const tableBody = document.createElement("tbody");

        totalCases.classList.add("hide");
        totalDeats.classList.add("hide");
        tableContainer.classList.add("hide");
        loadingMessage.classList.remove("hide");

        const response = await fetch(baseUrl + "pais=" + country);
        const data = await response.json();

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

        totalCases.classList.remove("hide");
        totalDeats.classList.remove("hide");
        tableContainer.classList.remove("hide");
        loadingMessage.classList.add("hide");

        totalCases.innerText = `Total de casos: ${contTotalCasos}`;
        totalDeats.innerText = `Total de mortes: ${contTotalMortes}`;

        table.appendChild(tableHeader);
        table.appendChild(tableBody);

        tableContainer.replaceChildren();
        tableContainer.appendChild(table);

        const formData = new FormData();
        formData.append('country', country);

        const teste = await fetch("save.php", {
            method: "POST",
            body: formData
        });

        const responseSave = await teste.json();
        console.log(responseSave.message);
    }
}