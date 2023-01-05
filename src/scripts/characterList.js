$().ready(function (){
    const characterListUrl = 'http://localhost:8081/GetDetailCharacterList'
    fetch(characterListUrl)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
            data.forEach(character => {
                const name =
                    '<li class="list-group-item">' +
                    '<a href ="http://localhost:63342/Bazy_Danych/src/CharacterDetail.html" ' +
                    'class="text-secondary">' +
                    character.name +
                    '</a>' +
                    '</li>'
                $('#characterList').append(name)
            })
        })
        .catch(err => console.log(err)) //to file

    $("#characterList").click(function()
    {
        let data = {}
        data.title = $(this).text();
        postData(data, 'GetAnimeTest')
            .then(response => response.json())
            .then(data => alert(data))
    });
})