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
        '<button type="submit" id="addAnimeButton" class="btn btn-outline-primary btn-lg text-truncate">' + "Add anime" + '</button>'
    $('#clickButton').append(button)
})

$().ready(function () {
    const addGenreUrl = 'http://localhost:8081/GetAddGenre'
    fetch(addGenreUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(anime => {
                const id = "gid:" + "{" + isNull(anime.gid[0]) + "}";
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(anime.name) +
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
                const id = "tid:" + "{" + isNull(anime.tid[0]) + "}";
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(anime.name) +
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
                const id = "fid:" + "{" + isNull(anime.fid[0]) + "}";
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(anime.name) +
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
                const id = "pid:" + "{" + isNull(anime.pid[0]) + "}";
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(anime.name) +
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
                const id = "oTid:" + "{" + isNull(anime.otid[0]) + "}";
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(anime.name) +
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
                const id = "oid:" + "{" + isNull(anime.oid[0]) + "}";
                const name =
                    '<li class="list-group-item">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="' + id + '" id="flexCheckData">' +
                    '<label class="form-check-label text-truncate" for="flexCheckData">' +
                    isNull(anime.name) +
                    '</label>' +
                    '</div>' +
                    '</li>'
                $('#addOrigin').append(name)
            })
        })
        .catch(err => console.log(err)) //to file
})

$(function () {
    $("#add_anime_form").submit(function (e) {
        e.preventDefault();

        let selected = [];
        let text = [];
        let gid = []
        let tid = []
        let oid = []
        let fid = []
        let otid = []
        let pid = []

        // Add each text value to the array
        $("#add_anime_form input[type=text]").each(function () {
            text.push(this.value);
        })

        // Checkout
        if(text[0].length >= 100) {
            alert("Title can be maximum 100 characters long.")
            text[0] = ""
        }
        if(isNaN(text[1])) {
            alert("Episode number must be an integer value.")
            text[1] = null
        }
        else {
            text[1] = parseFloat(text[1])
            if(!Number.isSafeInteger(text[1] - parseInt(text[1]))) {
                alert("3 Episode number must be an integer value.")
                text[1] = null
            }
            else {
                text[1] = parseInt(text[1])
                if(text[1] <= 0) {
                    alert("Episode number must be a positive integer value.")
                    text[1] = null
                }
            }
        }

        // Add each selected checkbox value to the array
        $("#add_anime_form input[type=checkbox]:checked").each(function () {
            selected.push(this.value);
        })

        while(true) {
            findStringByKey(selected, gid, "gid", 4)
            findStringByKey(selected, tid, "tid", 4)
            findStringByKey(selected, oid, "oid", 4)
            findStringByKey(selected, fid, "fid", 4)
            findStringByKey(selected, otid, "oTid", 5)
            findStringByKey(selected, pid, "pid", 4)

            if(selected.length<=0) {break}
        }

        let data = {
            "title": text[0],
            "ep_num": text[1],
            "gid": gid,
            "tid": tid,
            "oid": oid,
            "fid": fid,
            "otid": otid,
            "pid": pid,
        }

        if(data.title !== "" && data.ep_num !== null) {
            postData(data, 'PostAnimeTest')
                .then(response => response.json())
                .then(data => alert(data))
        } else {alert("You failed.")}
    });
});

