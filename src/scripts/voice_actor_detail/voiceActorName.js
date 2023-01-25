/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorNameUrl = 'http://localhost:8081/GetVoiceActorName';
	fetch(voiceActorNameUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(actor => {
				$('#actorName').append(isNull(actor.name));
			});
		})
		.catch(err => console.log(err)); //to file
});