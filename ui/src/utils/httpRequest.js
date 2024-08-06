import { BASE_URL_API } from "~/constants";

export async function post(url, data) {
    const resp = await fetch(`${BASE_URL_API}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const ok = resp.ok;
    const statusCode = resp.status;
    const result = await resp.json();

    return { ok, statusCode, result };
}