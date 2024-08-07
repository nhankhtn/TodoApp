import { BASE_URL_API } from "~/constants";


export async function get(url) {
    try {
        const token = localStorage.getItem("token-auth_x-todo");
        const resp = await fetch(`${BASE_URL_API}/${url}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const ok = resp.ok;
        const statusCode = resp.status;
        const result = await resp.json();

        return { ok, statusCode, result };
    }
    catch (err) {
        throw err;
    }
}

export async function post(url, data) {
    try {
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
    catch (err) {
        throw err;
    }
}
