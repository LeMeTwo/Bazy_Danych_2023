const otherTagsDisplay = document.querySelector('#otherTags')
const otherTagsUrl = 'http://localhost:8081/GetDetailOtherTags'

fetch(otherTagsUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(otherTags => {
            const name =
                '<li class="list-group-item">' + otherTags.name + '</li>'
            otherTagsDisplay.insertAdjacentHTML("beforeend", name)
        })
    })
    .catch(err => console.log(err)) //to file