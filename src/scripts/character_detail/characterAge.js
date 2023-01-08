$().ready(function () {
    const characterAgeUrl = 'http://localhost:8081/GetCharacterAge'
    fetch(characterAgeUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(character => {
                $('#age').append(isNull(character.age))
            })
        })
        .catch(err => console.log(err)) //to file
})