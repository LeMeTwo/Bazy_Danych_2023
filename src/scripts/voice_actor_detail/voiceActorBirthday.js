/* eslint-disable no-undef */
$().ready(function () {
	const voiceActorBirthdayUrl = 'http://localhost:8081/GetVoiceActorBirthday';
	fetch(voiceActorBirthdayUrl)
		.then(response => response.json())
		.then(data => {
			data.forEach(actor => {
				$('#actorBirthday').append(isNull(getDate(actor.birth)));
			});
		})
		.catch(err => console.log(err)); //to file
});