$().ready(function () {
    const characterListUrl = 'http://localhost:8081/GetDetailCharacterList'
    fetch(characterListUrl)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
            data.forEach(character => {
                const id = character.cid[0]
                const name =
                    '<li class="list-group-item">' +
                    '<p style="display: none">' + character.cid + " " + '</p>' +
                    '<a href ="http://localhost:63342/Bazy_Danych/src/CharacterDetail.html" ' +
                    'class="text-secondary id=' + id + '">' +
                    character.name +
                    '</a>' +
                    '</li>'
                $('#characterList').append(name)
            })
        })
        .catch(err => console.log(err)) //to file

    $("#characterList").on("click", "li",function () {
        let data = {}
        data.aid = getNumber($(this).text())
        postData(data, 'GetAnimeTest')
            .then(response => response.json())
            .then(data => alert(data))
    });
})