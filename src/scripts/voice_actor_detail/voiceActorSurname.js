/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorSurnameUrl = 'http://localhost:8081/GetVoiceActorSurname';
	fetch(voiceActorSurnameUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(actor => {
				$('#actorSurname').append(isNull(actor.surname));
			});
		})
		.catch(err => console.log(err)); //to file
});