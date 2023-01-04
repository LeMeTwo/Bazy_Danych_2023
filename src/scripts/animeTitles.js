const display = document.querySelector('#animeTitles')
const url = 'http://localhost:8081/GetAnimeTitles'

fetch(url)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(anime => {
            const title =
                '<li class="list-group-item">' +
                '<a href ="http://localhost:63343/Bazy_Danych/src/AnimeDetail.html" ' +
                'class="text-secondary">' +
                anime.title +
                '</a>' +
                '</li>'
            display.insertAdjacentHTML("beforeend", title)
        })
    })
    .catch(err => console.log(err)) //to file

// async function postData(data ={}, suffix) {
//     let postUrl = 'http://localhost:8081/' + suffix;
//     return await fetch(postUrl, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });
// }
//
// const data = {title: "Toradora!"}
//
// postData(data, 'GetAnimeName')
//     .then(response => response.json())
//     .then(data => console.log(data))