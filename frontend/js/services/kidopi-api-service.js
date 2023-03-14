"use strick";

// URL base da API da Kidopi
const baseUrlApiKidopi = "https://dev.kidopilabs.com.br/exercicio/covid.php?";

// função que busca os dados pelo país
export async function getByCountryKidopi(country) {
    // faz o fetch na API completando a URL
    const response = await fetch(baseUrlApiKidopi + "pais=" + country);
    // retorna a resposta em formato JSON
    return response.json();
}

// função que busca a lista de países disponíveis
export async function getCountriesAvailableKidopi() {
    // faz o fetch na API completando a URL
    const response = await fetch(baseUrlApiKidopi + "listar_paises=1");
    // retorna a resposta em formato JSON
    return response.json();
}