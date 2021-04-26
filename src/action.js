const isJson = (response) => response.headers.get('content-type')?.includes('application/json');
const buildHeaders = () => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
}
const fetchJson = (method, url, body) => {
    console.log("haha", JSON.stringify(body))
    const requestOptions = {
        // mode: 'cors',
        method: method,
        headers: buildHeaders(),
        body: JSON.stringify(body),
    };
    fetch(url, requestOptions)
        .then((response) => {
            console.log("response", response)
            const {ok, status, statusText} = response
            return isJson(response)
                ? response.json().then(json => [ok, json, status, statusText])
                : Promise.resolve([ok, {}, status, statusText])
        })
        .then(data => console.log("data:", data));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
};

export default fetchJson;
