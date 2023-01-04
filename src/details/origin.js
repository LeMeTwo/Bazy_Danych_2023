const originDisplay = document.querySelector('#origin')
const originUrl = 'http://localhost:8081/GetDetailOrigin'

fetch(originUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(origin => {
            const name =
                '<li class="list-group-item">' + origin.name + '</li>'
            originDisplay.insertAdjacentHTML("beforeend", name)
        })
    })
    .catch(err => console.log(err)) //to file