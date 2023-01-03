const feedDisplay = document.querySelector('#feed')

const allAnimeUrl = 'http://localhost:8081/GetAllAnime'

fetch(allAnimeUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(anime => {
            const title = '<h3>' + anime.title + '</h3>'
            feedDisplay.insertAdjacentHTML("beforeend", title)
        })
    })
    .catch(err => console.log(err))