$().ready(function () {
    const titleUrl = 'http://localhost:8081/GetDetailTitle'
    fetch(titleUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                $('#title').append(isNull(anime.title))
            })
        })
        .catch(err => console.log(err)) //to file
})