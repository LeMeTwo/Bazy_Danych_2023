$().ready(function () {
    const addTitleUrl = 'http://localhost:8081/GetMaxAid'
    fetch(addTitleUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const id = anime.max[0] + 1
                const title =
                    '<div class="mb-3">' +
                    '<p style="display: none">' + id + " " + '</p>' +
                    '<input type="text" class="form-control" aria-describedby="titleHelp" placeholder="Enter title">' +
                    '<div id="titleHelp" class="form-text text-muted">' + "Maximum 100 characters long." + '</div>' +
                    '</div>'
                $('#addTitle').append(title)
            })
        })
        .catch(err => console.log(err)) //to file
})

$().ready(function () {
    const epNum =
        '<div class="mb-3">' +
        '<input type="text" class="form-control" aria-describedby="epNumHelp" placeholder="Enter episode number">' +
        '<small id="epNumHelp" class="form-text text-muted">' + "Must be an integer value." + '</small>' +
        '</div>'
    $('#addEpNum').append(epNum)
})

$().ready(function () {
    const button =
        '<button type="submit" class="btn btn-outline-primary btn-lg text-truncate">' + "Add anime" + '</button>'
    $('#clickButton').append(button)
})

$().ready(function () {
    const addGenreUrl = 'http://localhost:8081/GetAddGenre'
    fetch(addGenreUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const id = anime.gid[0]
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(id) + " " + isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>'
                $('#addGenre').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})

$().ready(function () {
    const addTargetUrl = 'http://localhost:8081/GetAddTarget'
    fetch(addTargetUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const id = anime.tid[0]
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(id) + " " + isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>'
                $('#addTarget').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})

$().ready(function () {
    const addFormUrl = 'http://localhost:8081/GetAddForm'
    fetch(addFormUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const id = anime.fid[0]
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(id) + " " + isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>'
                $('#addForm').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})

$().ready(function () {
    const addPlaceUrl = 'http://localhost:8081/GetAddPlace'
    fetch(addPlaceUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const id = anime.pid[0]
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(id) + " " + isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>'
                $('#addPlace').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})

$().ready(function () {
    const addOtherTagsUrl = 'http://localhost:8081/GetAddOtherTags'
    fetch(addOtherTagsUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const id = anime.otid[0]
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(id) + " " + isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>'
                $('#addOtherTags').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})

$().ready(function () {
    const addOriginUrl = 'http://localhost:8081/GetAddOrigin'
    fetch(addOriginUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const id = anime.oid[0]
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(id) + " " + isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>'
                $('#addOrigin').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})