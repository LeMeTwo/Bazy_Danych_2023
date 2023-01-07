$().ready(function () {
    const voiceActorSexUrl = 'http://localhost:8081/GetVoiceActorSex'
    fetch(voiceActorSexUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(actor => {
                $('#actorSex').append(isNull(actor.sex))
            })
        })
        .catch(err => console.log(err)) //to file
})