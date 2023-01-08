$().ready(function () {
    const characterNameUrl = 'http://localhost:8081/GetCharacterName'
    fetch(characterNameUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(character => {
                $('#name').append(isNull(character.name))
            })
        })
        .catch(err => console.log(err)) //to file
})