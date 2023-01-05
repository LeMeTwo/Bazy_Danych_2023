$().ready(function () {
    const genreUrl = 'http://localhost:8081/GetDetailGenre'
    fetch(genreUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const name =
                    '<li class="list-group-item">' + isNull(anime.name) + '</li>'
                $('#genre').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})