async function postData(data = {}, suffix) {
    let url = 'http://127.0.0.1:8081/' + suffix;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response; // parses JSON response into native JavaScript objects
}