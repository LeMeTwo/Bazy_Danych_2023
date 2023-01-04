const titleDisplay = document.querySelector('#title')
const titleUrl = 'http://localhost:8081/GetDetailTitle'

fetch(titleUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(anime => {
            const title = anime.title
            titleDisplay.insertAdjacentHTML("beforeend", title)
        })
    })
    .catch(err => console.log(err)) //to file