const targetDisplay = document.querySelector('#target')
const targetUrl = 'http://localhost:8081/GetDetailTarget'

fetch(targetUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(target => {
            const name =
                '<li class="list-group-item">' + target.name + '</li>'
            targetDisplay.insertAdjacentHTML("beforeend", name)
        })
    })
    .catch(err => console.log(err)) //to file