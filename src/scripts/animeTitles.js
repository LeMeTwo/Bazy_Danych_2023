$().ready(function (){

    const postUrl = 'http://localhost:8081/GetAnimeTest'
    async function postData(data = {}) {
        const response = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response; // parses JSON response into native JavaScript objects
    }

    const getUrl = 'http://localhost:8081/GetAnimeTitles'
    fetch(getUrl)
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
        var data = {}
        data.title = $(this).html();
        postData(data)
            .then(response => response.json())
            .then(data => alert(data))
    });
})