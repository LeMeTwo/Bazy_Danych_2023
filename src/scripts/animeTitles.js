$().ready(function (){
    const titleListUrl = 'http://localhost:8081/GetAnimeTitles'
    fetch(titleListUrl)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
            data.forEach(anime => {
                const title =
                    '<li class="list-group-item">' +
                    '<a href ="http://localhost:63342/Bazy_Danych/src/AnimeDetail.html" ' +
                    'class="text-secondary">' +
                    anime.title +
                    '</a>' +
                    '</li>'
                $('#animeTitles').append(title)
            })
        })
        .catch(err => console.log(err)) //to file

    $("#animeTitles").click(function()
    {
        let data = {}
        data.title = $(this).text();
        postData(data, 'GetAnimeTest')
            .then(response => response.json())
            .then(data => alert(data))
    });
})