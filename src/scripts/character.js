const characterDisplay = document.querySelector('#character')
const characterUrl = 'http://localhost:8081/GetDetailCharacter'

fetch(characterUrl)
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => {
        data.forEach(character => {
            const name =
                '<li class="list-group-item">' +
                '<a href ="http://localhost:63343/Bazy_Danych/src/CharacterDetail.html" ' +
                'class="text-secondary">' +
                character.name +
                '</a>' +
                '</li>'
            characterDisplay.insertAdjacentHTML("beforeend", name)
        })
    })
    .catch(err => console.log(err)) //to file