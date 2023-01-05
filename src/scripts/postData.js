async function postData(data = {}, suffix) {
    let url = 'http://127.0.0.1:8081/' + suffix;
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }); // parses JSON response into native JavaScript objects
}

function getNumber(text) {
    let words = text.split(" ")
    return "{" + words[0] + "}";
}

function isNull(variable) {
    if(variable == null) {return ""} else {return variable}
}

function isNullComma(variable) {
    if(variable == null) {return ""} else {return variable + ", "}
}