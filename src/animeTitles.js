const display = document.querySelector('#animeTitles')
const url = 'http://localhost:8081/GetAnimeTitles'

fetch(url)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(anime => {
            const title =
                '<li class="list-group-item">' +
                '<a href ="http://localhost:63342/Bazy_Danych/AnimeDetail.html">' +
                anime.title +
                '</a>' +
                '</li>'
            display.insertAdjacentHTML("beforeend", title)
        })
    })
    .catch(err => console.log(err)) //to file