"use strick";

// URL base da API da Kidopi
const baseUrlApiKidopi = "https://dev.kidopilabs.com.br/exercicio/covid.php?";

// função que busca os dados pelo país
export async function getByCountryKidopi(country) {
    const response = await fetch(baseUrlApiKidopi + "pais=" + country);
    return response.json();
}

// função que busca a lista de países disponíveis
export async function getCountriesAvailableKidopi() {
    const response = await fetch(baseUrlApiKidopi + "listar_paises=1");
    return response.json();
}