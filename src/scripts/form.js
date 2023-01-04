const formDisplay = document.querySelector('#form')
const formUrl = 'http://localhost:8081/GetDetailForm'

fetch(formUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(form => {
            const name =
                '<li class="list-group-item">' + form.name + '</li>'
            formDisplay.insertAdjacentHTML("beforeend", name)
        })
    })
    .catch(err => console.log(err)) //to file