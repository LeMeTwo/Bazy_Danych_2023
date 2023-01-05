$().ready(function () {
    const formUrl = 'http://localhost:8081/GetDetailForm'
    fetch(formUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const name =
                    '<li class="list-group-item">' + isNull(anime.name) + '</li>'
                $('#form').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})