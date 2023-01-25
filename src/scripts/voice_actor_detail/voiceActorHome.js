/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorHomeUrl = 'http://localhost:8081/GetVoiceActorHome';
	fetch(voiceActorHomeUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(actor => {
				$('#actorHome').append(isNull(getArray(actor.home)));
			});
		})
		.catch(err => console.log(err)); //to file
});