const genreDisplay = document.querySelector('#genre')
const genreUrl = 'http://localhost:8081/GetDetailGenre'

fetch(genreUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(genre => {
            const name =
                '<li class="list-group-item">' + genre.name + '</li>'
            genreDisplay.insertAdjacentHTML("beforeend", name)
        })
    })
    .catch(err => console.log(err)) //to file