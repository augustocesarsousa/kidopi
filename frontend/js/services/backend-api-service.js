"use strick";

// URL base do backend
const baseUrlApiBackend = "http://localhost/kidopi/backend/";

// função que faz o POST no backend para salvar o país
export async function saveCountryBackend(country) {
    // cria o formData para contrução o corpo do método POST
    const formData = new FormData();
    // adiciona o país no formData
    formData.append('country', country);

    // faz o fatch com método POST no backend completando a URL e passando o formData no corpo
    await fetch(baseUrlApiBackend + "save_last_search.php", {
        method: "POST",
        body: formData
    });
}

// função que busca os país no backend para popular o select
export async function getSelectCountryBackend() {
    // faz o fetch backend completando a URL
    const response = await fetch(baseUrlApiBackend + "get_select_country.php");
    // retorna a resposta em formato JSON
    return response.json();
}

// função que busca a ultima consulta no backend para montar o footer
export async function getLastSearchBackend() {
    // faz o fetch backend completando a URL
    const response = await fetch(baseUrlApiBackend + "get_last_search.php");
    // retorna a resposta em formato JSON
    return await response.json();
}