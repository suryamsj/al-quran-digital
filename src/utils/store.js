// Get Data From API
export async function callApi(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}