const isJson = (response) => response.headers.get('content-type')?.includes('application/json');
const buildHeaders = () => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
}

const fetchJson = (method, url, body) => {
    const requestOptions = {
        method: method,
        headers: buildHeaders(),
        body: JSON.stringify(body),
    };
    return fetch(url, requestOptions)
        .then((response) => {
            const {ok, status, statusText} = response
            return isJson(response)
                ? response.json().then(json => [ok, json, status, statusText])
                : Promise.resolve([ok, {}, status, statusText])
        })
        .then(([ok, responseBody, status, statusText]) => {
            if (ok) {
                return responseBody
            }
            const error = {status, statusText, responseBody}
            console.log("ERROR, response: ", error)
            throw error
        })
}

export default fetchJson;
