const baseUrl = "https://dev.kidopilabs.com.br/exercicio/covid.php?";
const selectCountry = document.getElementById("select-country");
const loadingMessage = document.getElementById("loading-message");
const totalCasos = document.getElementById("total-casos");
const totalMortes = document.getElementById("total-mortes");
let contTotalCasos = 0;
let contTotalMortes = 0;
const tableContainer = document.getElementById("table-container");
const tableHeaderElements = ["Estado/Província", "Casos confirmados", "Mortes confirmadas"];

async function getByCountry(){

    let country = selectCountry.options[selectCountry.selectedIndex].value;
    if(country !== ""){
        loadingMessage.classList.remove("hide");
        const response = await fetch(baseUrl + "pais=" + country);
        const data = await response.json();
        loadingMessage.classList.add("hide");
        
        const table = document.createElement("table");
        const tableHeader = document.createElement("thead");""
        const tableBody = document.createElement("tbody");
    
        tableHeaderElements.map((element) => {
            const th = document.createElement("th");
            th.innerText = element;
    
            tableHeader.appendChild(th);        
        })
    
        for(const key in data){
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
    
        totalCasos.innerText = `Total de casos: ${contTotalCasos}`;
        totalMortes.innerText = `Total de mortes: ${contTotalMortes}`;
        table.appendChild(tableHeader);
        table.appendChild(tableBody);

        tableContainer.replaceChildren();
        tableContainer.appendChild(table);
    }
}