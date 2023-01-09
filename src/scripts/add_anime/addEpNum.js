$().ready(function () {
    const epNum =
        '<div class="mb-3">' +
        '<input type="text" class="form-control" aria-describedby="epNumHelp" placeholder="Enter episode number">' +
        '<div id="epNumHelp" class="form-text text-muted">' + "Must be an integer from 1 to 1000." + '</div>' +
        '</div>'
    $('#addEpNum').append(epNum)
})