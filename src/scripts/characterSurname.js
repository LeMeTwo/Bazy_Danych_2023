$().ready(function () {
    const characterSurnameUrl = 'http://localhost:8081/GetCharacterSurname'
    fetch(characterSurnameUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(character => {
                $('#surname').append(isNull(character.surname))
            })
        })
        .catch(err => console.log(err)) //to file
})