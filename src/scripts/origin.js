$().ready(function () {
    const originUrl = 'http://localhost:8081/GetDetailOrigin'
    fetch(originUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const name =
                    '<li class="list-group-item">' + isNull(anime.name) + '</li>'
                $('#origin').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})