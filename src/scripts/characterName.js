$().ready(function () {
    const characterNameUrl = 'http://localhost:8081/GetCharacterName'
    fetch(characterNameUrl)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
            data.forEach(character => {
                const id = character.cid[0]
                const name =
                    '<p style="display: none">' + character.cid + " " + '</p>' +
                    '<a href ="http://localhost:63342/Bazy_Danych/src/CharacterDetail.html" ' +
                    'class="text-secondary id=' + id + '">' +
                    character.name +
                    '</a>'
                $('#name').append(name)
            })
        })
        .catch(err => console.log(err)) //to file

    $("#name").click(function() {
        let data = {}
        data.cid = getNumber($(this).text())
        postData(data, 'GetAnimeTest')
            .then(response => response.json())
            .then(data => alert(data))
    });
})