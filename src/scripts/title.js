$().ready(function (){
    const titleUrl = 'http://localhost:8081/GetDetailTitle'
    fetch(titleUrl)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
            data.forEach(anime => {
                const id = anime.aid[0]
                const title =
                    '<p style="display: none">' + anime.aid + " " + '</p>' +
                    '<a href ="http://localhost:63342/Bazy_Danych/src/AnimeDetail.html" ' +
                    'class="text-secondary id=' + id + '">' +
                    anime.title +
                    '</a>'
                $('#title').append(title)
            })
        })
        .catch(err => console.log(err)) //to file

    $("#title").click(function()
    {
        let data = {}
        data.aid = getNumber($(this).text())
        postData(data, 'GetAnimeTest')
            .then(response => response.json())
            .then(data => alert(data))
    });
})