const placeDisplay = document.querySelector('#place')
const placeUrl = 'http://localhost:8081/GetDetailPlace'

fetch(placeUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(form => {
            const name =
                '<li class="list-group-item">' + form.name + '</li>'
            placeDisplay.insertAdjacentHTML("beforeend", name)
        })
    })
    .catch(err => console.log(err)) //to file