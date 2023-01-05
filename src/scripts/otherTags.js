$().ready(function () {
    const otherTagsUrl = 'http://localhost:8081/GetDetailOthertags'
    fetch(otherTagsUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const name =
                    '<li class="list-group-item">' + isNull(anime.name) + '</li>'
                $('#otherTags').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})