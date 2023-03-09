const baseUrlApiKidopi = "https://dev.kidopilabs.com.br/exercicio/covid.php?";

export async function getByCountryKidopi(country) {
    const response = await fetch(baseUrlApiKidopi + "pais=" + country);
    return response.json();
}

export async function getCountriesAvailableKidopi() {
    const response = await fetch(baseUrlApiKidopi + "listar_paises=1");
    return response.json();
}