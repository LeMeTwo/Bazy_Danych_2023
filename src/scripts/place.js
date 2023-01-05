$().ready(function () {
    const placeUrl = 'http://localhost:8081/GetDetailPlace'
    fetch(placeUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const name =
                    '<li class="list-group-item">' + isNull(anime.name) + '</li>'
                $('#place').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})