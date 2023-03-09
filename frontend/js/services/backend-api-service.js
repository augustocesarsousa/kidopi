const baseUrlApiBackend = "http://localhost/kidopi/backend/";

export async function saveCountryBackend(country) {
    await getLastSearchBackend();

    const formData = new FormData();
    formData.append('country', country);

    await fetch(baseUrlApiBackend + "save_last_search.php", {
        method: "POST",
        body: formData
    });
}

export async function getSelectCountryBackend() {
    const response = await fetch(baseUrlApiBackend + "get_select_country.php");
    return response.json();
}

export async function getLastSearchBackend() {
    const response = await fetch(baseUrlApiBackend + "get_last_search.php");
    return await response.json();
}