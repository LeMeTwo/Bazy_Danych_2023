$().ready(function (){
    const titleListUrl = 'http://localhost:8081/GetAnimeList'
    fetch(titleListUrl)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
            data.forEach(anime => {
                const id = anime.aid[0]
                const title =
                    '<li class="list-group-item">' +
                    '<p style="display: none">' + "[ " + anime.aid + " " + '</p>' +
                    '<a href ="http://localhost:63342/Bazy_Danych/src/AnimeDetail.html" ' +
                    'class="text-secondary id=' + id + '">' +
                    anime.title +
                    '</a>' +
                    '<p style="display: none">' + " ]" + '</p>' +
                    '</li>'
                $('#animeList').append(title)
            })
        })
        .catch(err => console.log(err)) //to file

    $("#animeList").click(function()
    {
        let data = {}
        data.title = $(this).text();
        postData(data, 'GetAnimeTest')
            .then(response => response.json())
            .then(data => alert(data))
    });
})