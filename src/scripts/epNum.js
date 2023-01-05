const epNumDisplay = document.querySelector('#epNum')
const epNumUrl = 'http://localhost:8081/GetDetailEpNum'

fetch(epNumUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(anime => {
            const epNum = anime.ep_num
            epNumDisplay.insertAdjacentHTML("beforeend", epNum)
        })
    })
    .catch(err => console.log(err)) //to file