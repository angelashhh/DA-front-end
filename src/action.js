const fetchJson = (method, url, body) => fetch(url,
    {
     method,
     body: JSON.stringify(body),
     headers: null
    })
    .then((response) => {
    const {ok, status, statusText} = response
//    return isJson(response)
//    ? response.json().then(json => [ok, json, status, statusText])
//    : Promise.resolve([ok, {}, status, statusText])
        return Promise.resolve([ok, {}, status, statusText])
    })
    .then(([ok, responseBody, status, statusText]) => {
    if (ok) {return responseBody}
    const error = {status, statusText, responseBody}
    console.log('ERROR, response: ', error)
    throw error
    })

export default fetchJson;
